const fs = require('fs');
const mongoose = require('mongoose');

// Read the JSON file
fs.readFile('./dataset.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    try {
        // Parse the JSON data
        const json = JSON.parse(data);

        // Iterate over each document
        const updatedJson = json.map(doc => {
            // Convert the _id field to a valid ObjectId
            doc._id = new mongoose.Types.ObjectId();
            return doc;
        });

        // Write the updated JSON data back to a file
        fs.writeFile('./dataset.json', JSON.stringify(updatedJson, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('File updated successfully');
        });
    } catch (err) {
        console.error(err);
    }
});
