const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('profil', {
    id_profil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prenom_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_image_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_utilisateur: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'utilisateur',
        key: 'id_utilisateur'
      },
      unique: "profil_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'profil',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_profil" },
        ]
      },
      {
        name: "id_utilisateur",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_utilisateur" },
        ]
      },
    ]
  });
};