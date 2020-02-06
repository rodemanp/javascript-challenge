// Declare all the variables 
var tableData = data;
var tbody; 
var row;
var cell;
var clear = d3.select("#clear-btn");

// Display table with all UFO sightings
tableData.forEach(function(record) {
    tbody = d3.select("tbody");
    row = tbody.append("tr");
    Object.entries(record).forEach(function([key, value]) {
        cell = row.append("td");
        cell.text(value);
    });
});

// Select the input element and get the raw HTML node
var button = d3.select('#filter-btn');

// Event handler for date filter button
button.on("click", function() {
    
    // Get the value property of the input
    var filterDate= d3.select("#datetime").property("value");
    
    function dateFilter() {
        var filteredData = tableData.filter(entry => entry.datetime === filterDate);
        console.log(filteredData);

        // If statement 
        if (filteredData === undefined || filteredData.length == 0) {

            // Display a message If filtered date data is undefined
            var error_div = d3.select("#error-msg");
            error_div.append("h1").text("Sorry, there were no results on this date.  Please press the Clear button below, then enter a new date!");

            // Remove the table from the page
            d3.select("#ufo-table").remove();

        }

        filteredData.forEach(function(record) {
            tbody = d3.select("tbody");
            row = tbody.append("tr");            
            
            Object.entries(record).forEach(function([key, value]) {
                cell = row.append("td");
                cell.text(value);
            });
        });
    }
    
    if (filterDate != "") {
        var table = document.querySelector("tbody");
        for(var i = table.rows.length - 1; i >= 0; i--)
        {
            table.deleteRow(i);
        }
        dateFilter();
    }  
});
