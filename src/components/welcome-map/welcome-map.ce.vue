<template>
  <div class="container mx-auto">
    <div ref="mapContainer" class="map-container h-[600px]"></div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/mapbox-gl/dist/mapbox-gl.css";
</style>
<script>
import mapboxgl from "mapbox-gl";
import axios from "../../_common/axios.mjs";
export default {
  name: "WelcomeMap",
  data() {
    return {
      map: null,
      // These coordinates are just for testing right now
      start: [-1.055034237300904, 53.94578819348761],
      // end: [-1.052836524907442, 53.94704872205198],
      formattedLocations: [],
      urlLocation: "",
      activeLocation: {},
    };
  },
  mounted() {
    this.getLocations();
    mapboxgl.accessToken =
      "pk.eyJ1IjoieXVzdWRldjAiLCJhIjoiY20wcDd1YmRnMDMzajJpcjFhZng0M24xNSJ9.ikaabBuaSdRfEvVCOqbj9w";
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      // Leaving this in commented for when Nathan inevitably asks me to take the 3D buildings out
      // style: "mapbox://styles/mapbox/streets-v12",
      center: [-1.054709, 53.945624],
      zoom: 15,
    });

    this.map = map;

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    const NavigationControl = new mapboxgl.NavigationControl();
    // Add the control to the map.
    this.map.addControl(geolocate);
    this.map.addControl(NavigationControl, "top-right");

    let self = this;
    this.map.on("load", function () {
      // geolocate.trigger();
      geolocate.on("geolocate", function (e) {
        self.start = [e.coords.longitude, e.coords.latitude];
      });
      for (let i = 0; i < self.formattedLocations.length; i++) {
        map.addSource(self.formattedLocations[i].properties.name, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [self.formattedLocations[i]],
          },
        });
        self.map.addLayer({
          id: self.formattedLocations[i].properties.name,
          type: "circle",
          source: self.formattedLocations[i].properties.name,
          paint: {
            "circle-radius": 5,
            "circle-color": "#f2cb50",
            "circle-stroke-color": "#000000",
            "circle-stroke-width": 1,
          },
        });
        self.map.addLayer({
          id: self.formattedLocations[i].properties.name + " Label",
          type: "symbol",
          source: self.formattedLocations[i].properties.name,
          minzoom: 12,
          layout: {
            "text-field": ["get", "name"],
            "text-size": 16,
            "text-variable-anchor": ["bottom", "top"],
            "text-offset": [0, 0.8],
            visibility: "visible",
          },
        });
        map.on("mouseenter", self.formattedLocations[i].properties.name, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", self.formattedLocations[i].properties.name, () => {
          map.getCanvas().style.cursor = "";
        });
        map.on("click", self.formattedLocations[i].properties.name, (e) => {
          self.updateActiveLocation(e.features[0]);
          const coordinates = e.features[0].geometry.coordinates.slice();
          const popupContent = document.createElement("div");
          popupContent.className = "flex flex-col gap-y-2";

          const title = document.createElement("h3");
          title.className = "font-bold text-lg";
          title.textContent = e.features[0].properties.name;
          popupContent.appendChild(title);

          if (e.features[0].properties.category_name) {
            const category = document.createElement("h4");
            category.className = "font-semibold";
            category.textContent = e.features[0].properties.category_name;
            popupContent.appendChild(category);
          }

          const seeStallsButton = document.createElement("a");
          seeStallsButton.className =
            "btn text-center bg-mustard font-semibold py-1";
          seeStallsButton.textContent = "See Stalls";
          popupContent.appendChild(seeStallsButton);

          const directionsButton = document.createElement("button");
          directionsButton.className = "bg-mustard font-semibold py-1";
          directionsButton.textContent = "Directions";
          directionsButton.addEventListener("click", () => {
            self.getRoute(coordinates);
            self.map.Popup.remove();
          });

          // console.log(e.features[0].properties.facilities);
          // if (e.features[0].properties.facilities.length > 0) {
          //   const facilities = document.createElement("div");
          //   facilities.className = "flex flex-col";
          //   const facilitiesTitle = document.createElement("h4");
          //   facilitiesTitle.className = "font-semibold";
          //   facilitiesTitle.textContent = "Facilities";
          //   facilities.appendChild(facilitiesTitle);
          //   const facilitiesList = document.createElement("ul");
          //   facilitiesList.className = "list-disc list-inside";
          //   for (
          //     let i = 0;
          //     i < e.features[0].properties.facilities.length;
          //     i++
          //   ) {
          //     const facility = document.createElement("li");
          //     facility.textContent = e.features[0].properties.facilities[i];
          //     facilitiesList.appendChild(facility);
          //   }
          //   facilities.appendChild(facilitiesList);
          //   popupContent.appendChild(facilities);
          // }

          popupContent.appendChild(directionsButton);

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          self.map.Popup = new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setDOMContent(popupContent)
            .addTo(map);
        });
      }
      self.getUrlParam();
    });
  },
  methods: {
    async getLocations() {
      let self = this;
      await axios
        .get("https://welcome-database.pages.dev/api/location")
        .then(function (response) {
          for (let i = 0; i < response.data.length; i++) {
            self.formattedLocations.push({
              type: "Feature",
              properties: {
                name: response.data[i].name,
                category_name: response.data[i].category_name,
                id: response.data[i].id,
                facilities: response.data[i].facilities,
              },
              geometry: {
                type: "Point",
                coordinates: [response.data[i].long, response.data[i].lat],
              },
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getRoute(end) {
      let self = this;
      await axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${this.start[0]},${this.start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        )
        .then(function (response) {
          const route = response.data.routes[0].geometry.coordinates;
          const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };
          if (self.map.getSource("route")) {
            self.map.getSource("route").setData(geojson);
          } else {
            self.map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#307CBF",
                "line-width": 5,
                "line-opacity": 1,
              },
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUrlParam() {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      if (urlParams.has("location")) {
        this.urlLocation = urlParams.get("location");
        this.updateActiveLocation();
      }
    },
    updateActiveLocation(location) {
      let self = this;
      if (location) {
        if (location != this.activeLocation) {
          this.map.setPaintProperty(
            self.activeLocation.properties.name,
            "circle-radius",
            5,
          );
          this.map.setPaintProperty(
            self.activeLocation.properties.name,
            "circle-stroke-width",
            1,
          );
          this.map.setLayoutProperty(
            self.activeLocation.properties.name + " Label",
            "text-size",
            16,
          );
        }
        this.activeLocation = location;
      } else {
        this.activeLocation = this.formattedLocations.find(
          (location) => location.properties.id == this.urlLocation,
        );
      }
      this.map.setPaintProperty(
        self.activeLocation.properties.name,
        "circle-radius",
        8,
      );
      this.map.setPaintProperty(
        self.activeLocation.properties.name,
        "circle-stroke-width",
        2,
      );
      this.map.setLayoutProperty(
        self.activeLocation.properties.name + " Label",
        "text-size",
        18,
      );
      this.map.flyTo({
        center: [
          self.activeLocation.geometry.coordinates[0],
          self.activeLocation.geometry.coordinates[1],
        ],
        zoom: 16,
      });
    },
    unmounted() {
      this.map.remove();
      this.map = null;
    },
  },
};
</script>
