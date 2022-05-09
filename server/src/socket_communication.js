// const {app} = require("../index");

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);


// const temporaryData = [
//     {
//         userID: 0,
//         firstName: "John", 
//         lastName: "Bibi", 
//         borrowsList: [
//             {borrowID: 0, materialName: "Appareil photo Nikon", isBorrowed: false, isReturned: false},
//             {borrowID: 1, materialName: "Caméra Sony", isBorrowed: true, isReturned: false},
//             {borrowID: 2, materialName: "Trépied", isBorrowed: true, isReturned: false},
//         ] 
//     },
//     {
//         userID: 1,
//         firstName: "Béatrice", 
//         lastName: "Sicle", 
//         borrowsList: [
//             {borrowID: 3, materialName: "Appareil photo Sony", isBorrowed: true, isReturned: false},
//             {borrowID: 4, materialName: "Microphone Bird UM1", isBorrowed: false, isReturned: false},
//             {borrowID: 5, materialName: "Perche", isBorrowed: false, isReturned: false},
//         ] 
//     },
// ]

// io.on('connection', (client) => { 
//     io.emit('connected');
//     console.log(`Connecté au client ${client.id}`)

//     client.emit("data", {temporaryData}); //Envoyer le tableau de données.

//     //récupération des données de la signature du client
//     client.on("getDataFromClient", (data) => {
//         console.log("l'id de l'utilisateur est : ", data.userID)
//     })

//     client.on('disconnect', () => {
//         console.log(`Le client ${client.id} est déconnecté`);
//     });
// });

// server.listen(3000, () => {
//     console.log("Serveur en écoute sur le port 3000");
// });