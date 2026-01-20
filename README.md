# mongoose-commands
mongoose commands

# For compress api response data
1. in express server use compression npm
Brotli, gzip

<!-- compression steps -->
Client → Request
Server → Build JSON
Server → gzip (1–2 ms)
Server → Send 5 KB (faster)
Client → unzip
<!-- end -->


# For show api response in terminal 
1. morgan npm