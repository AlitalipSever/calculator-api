#calculator-api
Performing mathematical operations with API get request.

app running at https://calculator-ats.herokuapp.com/healthcheck
##usage

math operation: `2 * (23/(3*3))- 23 * (2*3)`

it should be UTF-8

base64 format: `MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=`

``` 
curl --location --request GET 'https://calculator-ats.herokuapp.com/api/calculator/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk'
```
it should return this
```json
{
    "error": false,
    "result": -132.89
}
```

##development
with npm:
`npm install`
`npm run dev`

with docker-dev: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

##deployment to prod.
Using docker and heroku:

1-heroku login: `heroku container:login`

2-build image: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`

3-tag image: `docker tag calculator-api_node-app registry.heroku.com/calculator-ats/web`

4-push to heroku: `docker push registry.heroku.com/calculator-ats/web`

5-release: `heroku container:release web --app calculator-ats`

##Postman Collection
```json
{
	"info": {
		"_postman_id": "4babb26a-60a7-4bae-9182-de1d27c8c5d2",
		"name": "calculator-api",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "GET calculus",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://calculator-ats.herokuapp.com/api/calculator/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk",
					"protocol": "https",
					"host": [
						"calculator-ats",
						"herokuapp",
						"com"
					],
					"path": [
						"api",
						"calculator",
						"calculus"
					],
					"query": [
						{
							"key": "query",
							"value": "MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "GET healthcheck",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://calculator-ats.herokuapp.com/healthcheck",
					"protocol": "https",
					"host": [
						"calculator-ats",
						"herokuapp",
						"com"
					],
					"path": [
						"healthcheck"
					]
				}
			},
			"response": []
		}
	]
}
```

