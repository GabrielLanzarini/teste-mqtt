## MQTT 

Dentro do terminal da EC2
```
sudo apt update
sudo apt upgrade

sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

Criando o arquivo de senha
``` 
mosquitto_passwd -c /etc/mosquitto/password_file <username> <password>
```

Para criar o arquivo de configuração do mosquitto
```
sudo nano /etc/mosquitto/conf.d/default.conf
```

default.conf
```
allow_anonymous false
listener 1883
password_file /etc/mosquitto/password_file
```

> Dica
- Lembre de abrir as portas na EC2 para que você consiga se conectar ao mqtt
