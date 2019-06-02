#!/bin/bash

rm -r ./node_modules
rm -r ./diagram-engine-prototype/node_modules
rm -r ./client/node_modules
rm -r ./server/node_modules

rm -f ./package-lock.json
rm -f ./diagram-engine-prototype/package-lock.json
rm -f ./client/package-lock.json
rm -f ./server/package-lock.json

rm -f ./yarn.lock
rm -f ./diagram-engine-prototype/yarn.lock
rm -f ./client/yarn.lock
rm -f ./server/yarn.lock