# Invoice Bot
A simple bot to generate final discounted invoice for a user.

## Running the bot
### With Docker
```bash
docker build -t bpradana/invoice-bot:1.0 . 
docker run -it --rm bpradana/invoice-bot:1.0
```
### Without Docker
```bash
npm install
npm run build
npm start
```

## How to use
1. Type `!inv fp <final price>` to add final price
2. Type `!inv a <buyer name>;<item name>;<price>;<quantity>` to add item
3. Type `inv l` to list all items
4. Type `!inv r <index>` to remove item
5. Type `!inv c` to clear all items
6. Type `!inv` to generate invoice