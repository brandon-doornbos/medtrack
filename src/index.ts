import { default as Express } from "express";
import { Sequelize, Model, DataTypes } from "sequelize";

const app = Express();

app.get("/query", (req, res) => {
    res.send("Hello World!");
});

app.use(Express.static("public", { extensions: ["html"] }));

const port = 3000;
app.listen(port, () => {
    console.log("Example app listening on port " + port);
});


// create db.sqlite if it does not exist
const sequelize = new Sequelize("sqlite://dist/db.sqlite");

class Medicine extends Model { }
const units = DataTypes.ENUM("g", "mg");
Medicine.init({
    name: DataTypes.STRING,
    dosage: DataTypes.INTEGER,
    unit: units,
}, { sequelize, modelName: 'medicine' });

(async () => {
    await sequelize.sync();
    const apirin = await Medicine.create({
        name: "Aspirin",
        dosage: 5,
        unit: units.values[1]
    });
    console.log(apirin.toJSON());
})();
