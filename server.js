import { app } from "./app.js"

app.listen(3000, () => {
    console.log("Server started on port 3000")
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Optionally process.exit(1) if you want to crash on unhandled rejections
});

process.on('uncaughtException', async err => {
    console.log('Uncaught exception..');
    console.log(err.name, err.message);
    // await app.close()
    // process.exit(1);
});