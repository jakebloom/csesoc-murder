# muder

This is CSESoc's online murder engine, which allows us to take our fun intra-society game into cyberspace! Users can register for an account and when the admin starts a game, they are all assigned targets and codewords. They need to find their target and "kill" them, and enter their codeword to confirm their kill.


## Dependencies
- nodejs (development)
- mongodb (development)
- docker (deployment)

## Deploying the latest official version
Assuming that you have docker installed:

    $ docker run --name mongodb-container -d mongo
    $ docker run -it --rm --name murder --link mongodb-container:mongodb -p 0.0.0.0:3000:3000 csesoc/murder
    
Then navigate to http://localhost:3000 or use your favourite web server to forward port 80 to port 3000 and expose the app to the internet!

## Development
Assuming that mongo is running:

    $ git clone
    $ cd
    $ npm install
    $ npm start
Then navigate to http://localhost:3000

