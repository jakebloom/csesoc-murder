# muder

This is CSESoc's online murder engine, which allows us to take our fun intra-society game into cyberspace! Users can register for an account using their student ID, and when the admin starts a game, they are all assigned targets and codewords. They need to find their target and "kill" them, and enter their codeword to confirm their kill.


## Dependencies
- [vagrant](https://www.vagrantup.com/) (development)
- [docker](https://www.docker.com/) (deployment)

## Deploying the latest official version
Assuming that you have docker installed:

    $ docker run --name mongodb-container -d mongo
    $ docker run -d --name murder --link mongodb-container:mongodb -p 3000:3000 csesoc/murder

## Development
Assuming that you have vagrant installed:

    $ git clone
    $ cp .env.example .env
    $ cd murder
Edit `.env` and insert your own secret, ZID and ZPASS.

    $ vagrant up
    $ vagrant ssh
    $ cd /vagrant
    $ source .env
    $ npm start

Then navigate to http://localhost:3000
