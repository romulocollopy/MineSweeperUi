import { graphql, useLazyLoadQuery } from 'react-relay';
import type { UserProfileQuery } from './__generated__/UserProfileQuery.graphql';

const UserProfile = () => {
  const data = useLazyLoadQuery<UserProfileQuery>(
    graphql`
      query UserProfileQuery {
        viewer {
          id
          name
          email
        }
      }
    `,
    {}
  );

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {data.viewer?.name}</p>
      <p>Email: {data.viewer?.email}</p>
    </div>
  );
};

export default UserProfile;
