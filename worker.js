// server.js
const express = require('express');
const { fork } = require('child_process');
const { Worker } = require('worker_threads');

const app = express();
const PORT = 3000;

// 1. हल्का राउट (यह चेक करने के लिए कि सर्वर चल रहा है या फ्रीज हो गया)
app.get('/light', (req, res) => {
    res.send("⚡ मैं सुपर फास्ट हूँ! सर्वर ब्लॉक नहीं है।");
});

// 2. तरीके 1: ब्लॉक करने वाला कोड (Bad Way ❌)
app.get('/block', (req, res) => {
    console.log("मेन थ्रेड पर भारी काम शुरू...");
    let count = 0;
    for (let i = 0; i < 5000000000; i++) { count++; } // 5 बिलियन का लूप
    res.send(`❌ काम पूरा, लेकिन सर्वर ब्लॉक हुआ था! काउंट: ${count}`);
});

// 3. तरीके 2: Child Process (Fork) का उपयोग (Good Way  )
app.get('/fork', (req, res) => {
    // heavyTask.js को एक अलग OS प्रोसेस में चलाएं
    const child = fork('./heavyTask.js');
    
    child.send('start'); // चाइल्ड को काम शुरू करने का इशारा दें
    
    child.on('message', (result) => {
        res.send(`✅ Child Process के जरिए काम पूरा! काउंट: ${result}`);
    });
});

// 4. तरीके 3: Worker Threads का उपयोग (Professional Way  )
app.get('/worker', (req, res) => {
    // एक इन-लाइन वर्कर थ्रेड बनाना (या आप अलग फाइल भी दे सकते हैं)
    // हम सीधे जावास्क्रिप्ट कोड को स्ट्रिंग के रूप में थ्रेड को दे रहे हैं
    const workerCode = `
        const { parentPort } = require('worker_threads');
        let count = 0;
        for (let i = 0; i < 5000000000; i++) { count++; }
        parentPort.postMessage(count);
    `;
    
    const worker = new Worker(workerCode, { eval: true });
    
    worker.on('message', (result) => {
        res.send(`✅ Worker Thread के जरिए काम पूरा! काउंट: ${result}`);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 सर्वर चालू है: http://localhost:${PORT}`);
});