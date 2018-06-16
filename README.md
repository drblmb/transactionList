# transactionList

```
npm install
npm start
```

* Run tests:

```
npm test
```

# Notes
* I went for a basic UI design since there were no specific requirements
* Most of the time, I prefer formatting to be done in the UI component, but I did it in the reducer because I would expect a server to format amounts and dates correctly
* Dealing with the dates was a bit tricky because they were not in a valid format
* The filter is going to apply to the displayed data, not the source data.
* Unit tests all run
* Added the display:none div as a trick to get the app to re-render when filter changed because the transaction list isn't actually changing
