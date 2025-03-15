# leaflet-challenge
# _Create the Earthquake Visualization - Leaflet-Part-1_

## _Background_
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## _Part 1: Create the Earthquake Visualization_
### _Got our dataset. To do so, followed these steps:_
*	The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the (USGS GeoJSON FeedLinks to an external site). page and chose a dataset to visualize. 
*	When clicked a dataset (such as "All Earthquakes from the Past 7 Days"), you are given a JSON representation of that data. Used the URL of this JSON to pull in the data for the visualization.
###  _Imported and visualized the data by doing the following:_
•	Using Leaflet, created a map that plots all the earthquakes from the dataset based on their longitude and latitude.
1.	Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
*	Included popups that provide additional information about the earthquake when its associated marker is clicked.
*	Created a legend that will provide context for the map data.
![image](https://github.com/user-attachments/assets/4496d5b9-89f6-4e61-8032-4b2840642c10)


