# BWP – Healthy Environments

## Introduction
Healthy Environments is a physical / digital didactic entertainment installation designed by Tellart for the Purina Better with Pets summit.
The summit was held on November 3rd 2015.

## Description
This piece is an evocative interactive piece. Attendees will be prompted to choose and object with an embedded RIFD tag in it, and place it in the scanning table.

When a selection is made, information about that specific object is displayed in screen.

## Architecture

![System Architecture of Healthy Environments](BWP_tech_architecture_BehaviourAtHome.png "Architecture")
###Hardware
 - Mac Mini
 - [Dell 24" S2440L](http://www.amazon.com/Dell-S2440L-24-Inch-LED-lit-Monitor/dp/B009H0XQRI)
 - [Arduino - R3](https://www.sparkfun.com/products/11021)
 - [RFID reader](https://www.sparkfun.com/products/11828) with [breakout](https://www.sparkfun.com/products/13030)

## Installing

This project runs on Node.js using Express.js and Socket.io

Some of the dependencies only work with older version of [Node.js v0.10.33](https://nodejs.org/dist/v0.10.33/)

Make sure computer has [Node.js](https://nodejs.org/dist/v0.10.33/) installed.
Place the root folder inside the Documents directory of the computer and type the following commands line by line to install.

>SIDE NOTE: the folder name bath stands for Behavior at Home. The initial name of the exhibit.

```bash
cd Documents/ZJ_BWP_Prototypes/bath
npm install
sudo npm install -g bower
```
>It will prompt you for the administrator password. You will not be able to see the
digits when you type, but it will work.

>NOTE: This last step only needs to be done once per computer.

Then proceed to install using:
```bash
cd public/
bower install
cd ../
```
This installs the necessary packages bundled with the necessary dependencies.
To start the server:
```bash
npm start
```

Now you can visit [localhost:3000](localhost:3000/nutrition_and_aging).Be sure to use [Chrome](https://www.google.com/chrome/) make the browser full screen. `F11` in Windows or `Shift + ⌘ + F` in Mac; once the browser is full screen refresh the page so that content can adjust to the size.

## Dependencies
____________________________
|NPM         | Bower         |
|-----------------|----------|
| body-parser     |hammerjs |
| cookie-parser   | jquery |
| debug   | quojs |
| express   | Snap.svg |
| express.io  | tween.js |
| jade  |
| jquery  |
| morgan  |
| serialport  |
| serve-favicon   |
| socket.io   |
