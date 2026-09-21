// heavyTask.js
process.on('message', (msg) => {
    if (msg === 'start') {
        console.log("Child Process: भारी कैलकुलेशन शुरू हो रही है...");
        
        let count = 0;
        // 5 बिलियन का भारी लूप (CPU-intensive)
        for (let i = 0; i < 5000000000; i++) {
            count++;
        }
        
        // काम पूरा होने पर मेन प्रोसेस को रिजल्ट वापस भेजें
        process.send(count);
        process.exit(); // काम खत्म होने पर प्रोसेस को बंद करें
    }
});