import React from "react";
import {Typography} from "@material-ui/core";
import { Query } from 'react-apollo';
import {GetAllMaturityRatingsQuery, GetAllMaturityRatingsQueryData} from "../Query/GetAllMaturityRatingsQuery";
class MaturityRatingList extends React.Component {

  render() {
    return (
      <div>
        <Typography variant="h5" color="textPrimary">Maturiry Rating List</Typography>
        <Query<GetAllMaturityRatingsQueryData, {}> query={GetAllMaturityRatingsQuery}>
          {({ loading, error, data }) => {

            if (loading) {
              return <div>Loading...</div>
            }

            if (error) {
              return <div>Error: Failed to fetch data</div>
            }

            if (data.maturity_ratings.length === 0) {
              return <div>No maturity ratings available:(</div>
            }

            return (
              <div>
                <ul>
                  {
                    data.maturity_ratings.map(maturity_rating =>
                      <li key={maturity_rating._id}>
                        <Typography color="textPrimary" gutterBottom>
                          {maturity_rating.name}
                        </Typography>
                      </li>
                    )
                  }
                </ul>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }

}

export default MaturityRatingList;
