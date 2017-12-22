# Visualising the airplane crashes since 1908
In this project, we will realise an interactive visualisation of the airplane crashes since 1908.

## Data describtion: 
Full history of airplane crashes throughout the world, from 1908-present.

## Link to Data: 
https://opendata.socrata.com/Government/Airplane-Crashes-and-Fatalities-Since-1908/q2te-8cvq

## Aim of visaualisation: 
Our visualisation gives a way for plane crashes analists to draw useful insights and intelligent hypothesis to be tested
related to the different aspects of a crash: date, number of injured/dead people, airline operator, departure/arrival cities,
location of the crash...

## The visualisaton in details:
The visualisation has 3 views.

### 1. Map:
The map shows the flights where the filters introduced by the user are verified. 
Every flight is a an edge from a departure city to the planned arrival city with a cross where the accident occurred.
In the map you can filter the flights by:
- Type: Military/ Non-military
- Year: Range of years during which the crash occurred
- Number of deaths: number of victims of that flight
When the mouse of the user is put on an edge, further details about the crash are visualised.

### 2. Plot of the number of injuries/deaths per year
This view is located on the bottom of the map.
It captures the range of years the user interested in and plot the total number of injuries/deaths for every year.
When the mouse of the user is put on a year, the crashes in that year are hilighted in the map. 

### 3. Top 20 airline operators bar chart:
This bar chart contains the 10 most dangerous airline operators for the range of years introduced by the user
When the mouse of the user is put on a bar, the crashes corresponding to that airline are hilighted in the map.  




Website : https://drnoodle.github.io/dataviz/

Screencast Link : https://www.youtube.com/watch?v=pRGYe5MVQQI
