const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.STRING,
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default message;
