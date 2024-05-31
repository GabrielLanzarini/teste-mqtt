## Repositório de Demonstração do MQTT com Conexão a um Broker na AWS EC2 
Este repositório foi criado para demonstrar a configuração e utilização do protocolo MQTT (Message Queuing Telemetry Transport) conectando-se a um broker configurado em uma instância EC2 da Amazon Web Services (AWS).


#### Dentro do terminal da EC2
```
sudo apt update
sudo apt upgrade

sudo apt-get install mosquitto
sudo apt-get install mosquitto-clients
```

#### Criando o arquivo de senha
``` 
mosquitto_passwd -c /etc/mosquitto/password_file <username> <password>
```

#### Para criar o arquivo de configuração do mosquitto
```
sudo nano /etc/mosquitto/conf.d/default.conf
```

#### default.conf
```
allow_anonymous false
listener 1883
password_file /etc/mosquitto/password_file
```

> Obs
- Lembre de abrir as portas na EC2 para que você consiga se conectar ao mqtt
