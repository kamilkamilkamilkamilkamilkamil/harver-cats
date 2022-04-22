

## **to run**
npm install and then 

    node main.ts
    

## personal notes:

Problems with mapbox/blend instal. Was mapbox/blend part of the challenge? lol
EDIT: I suspect it's an ISP issue / got a friend to try and install it too and he got access denied as well.

manually importing node-blend-master / didn't work / required another package which was access denied.
npm permissions denied to install packages.


request is deprecated Installing axios axios takes care of promises for me.

Less is more, bundle sizing - fetch api would be preferred.

Removing try/catch from axios request in favour to moving it into promise.all for fast-fail purposes (if 1 in 10 requests fail, whole thing breaks)
