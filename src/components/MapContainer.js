import React from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {connect} from 'react-redux';
import {getAllBids} from '../actions/jobs.js';
import Job from '../components/DriverBid.js';
import Geocode from 'react-geocode';
import '../scss/infoWindow.scss';


Geocode.setApiKey("AIzaSyDrIU9xfNYMyLfY1hZ9sn4kHL_U86NRNOY");

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentJob: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.windowHasClosed = this.windowHasClosed.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(getAllBids());
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  }

  windowHasClosed(props, marker, e) {
    this.setState({
      selectedPlace: props,
      showingInfoWindow: false
    });
  }

  //this function allows functionality to be put inside of the info window box
  //all html elements that require a callback function must be written here
  //in order to have functionality inside of the InfoWindow
  onInfoWindowOpen(props, e) {

    let bidCount = this.props.bids.filter(bid => {
      return bid.jobId === this.state.activeMarker.id
    })

    const info = (
      <div className="info">
        <h2>{this.state.activeMarker.name}</h2>
        <p>{this.state.activeMarker.description}</p>
        <p>bids: {bidCount.length}</p>
        <button
          className="bid-button"
          onClick={e => {
            this.windowHasClosed();
            this.setState({
              currentJob: this.props.jobs.find(job => {
                return job.props.id === this.state.activeMarker.id
              })
            })
          }}
        >bid
      </button>
    </div>
  );
  ReactDOM.render(
    React.Children.only(info),
    document.getElementById("info-window")

    );
  }

  render() {
    if (!this.props.loaded) {
      return <div>loading...</div>;
      } else if (this.props.center !== {}) {
        const style = {
          width: '80%',
          height: '70vh'
        }



        const jobs = this.props.jobs.filter(job => {
          return !job.props.accepted && !job.props.completed;
        });
        const markers = jobs.map((job, index) => {
          console.log(job.props)
          return (
            <Marker
              onClick={this.onMarkerClick}
              key={index}
              name={job.props.title}
              title={job.props.title}
              description={job.props.description}
              image={job.props.image}
              id={job.props.id}
              date={job.props.date}
              position={job.props.coordinates}>
            </Marker>
        )
      })

      return (
        <main>
          <div style={style}>
            {this.props.center !== {} &&
            <Map
              google={this.props.google}
              style={style}
              zoom={12}
              initialCenter={this.props.center}
              styles={[
                {
                          "featureType": "all",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#ebebeb"

                    }

                  ]

                  },
                {
                          "featureType": "landscape.man_made",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#d6d2cc"

                    }

                  ]

                  },
                {
                          "featureType": "poi",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#8d867c"

                    }

                  ]

                  },
                {
                          "featureType": "road.highway",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#8b1b41"

                    }

                  ]

                  },
                {
                          "featureType": "road.highway",
                          "elementType": "geometry.stroke",
                  "stylers": [
                    {
                                      "color": "#8b1b41"

                    },
                    {
                                      "lightness": "50"

                    }

                  ]

                  },
                {
                          "featureType": "road.arterial",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#fcd27f"

                    }

                  ]

                  },
                {
                          "featureType": "road.arterial",
                          "elementType": "geometry.stroke",
                  "stylers": [
                    {
                                      "color": "#fcd27f"

                    },
                    {
                                      "lightness": "50"

                    }

                  ]

                  },
                {
                          "featureType": "water",
                          "elementType": "geometry.fill",
                  "stylers": [
                    {
                                      "color": "#12202f"

                    },
                    {
                                      "gamma": "2.00"

                    }

                  ]

                  },
                {
                          "featureType": "water",
                          "elementType": "labels.text.fill",
                  "stylers": [
                    {
                                      "lightness": "100"

                    }

                  ][
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ebebeb"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d6d2cc"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8d867c"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8b1b41"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#8b1b41"
            },
            {
                "lightness": "50"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fcd27f"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fcd27f"
            },
            {
                "lightness": "50"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#12202f"
            },
            {
                "gamma": "2.00"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "100"
            }
        ]
    }
]

                }

              ] }
            >

            {markers}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={e => {
                this.onInfoWindowOpen(this.props, e);
              }}
              onClose={this.windowHasClosed}
            >
             <div id="info-window" />
            </InfoWindow>
          </Map>
      }
      {/*<BidMap google={this.props.google} />*/}
    </div>
    {this.state.currentJob.props && (
      <section>
        <Job
          name={this.state.currentJob.props.name}
          title={this.state.currentJob.props.title}
          desc={this.state.currentJob.props.desc}
          image={this.state.currentJob.props.image}
          id={this.state.currentJob.props.id}
          date={this.state.currentJob.props.date}
          budget={this.state.currentJob.props.budget}
        />
      </section>
  )}
</main>
      );
    }
    }
    }

const mapStateToProps = state => ({

  center: state.auth.currentUser.coords,
  bids: state.bids.bids
})


export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDrIU9xfNYMyLfY1hZ9sn4kHL_U86NRNOY"
  })(MapContainer)
);
