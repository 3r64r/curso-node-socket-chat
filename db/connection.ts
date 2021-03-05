import {Sequelize} from 'sequelize';


const db = new Sequelize('node', 'nodeuser', 'magento', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;