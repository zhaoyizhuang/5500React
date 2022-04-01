// import {UserList} from "../components/profile/user-list";
// import {screen, render} from "@testing-library/react";
// import {HashRouter} from "react-router-dom";
// import {findAllUsers} from "../services/users-service";
// import axios, {Axios} from "axios";
//
// const MOCKED_USERS = [
//   {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
//   {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
// ]
//
// test('user list renders static user array', () => {
//   render(
//     <HashRouter>
//       <UserList users={MOCKED_USERS}/>
//     </HashRouter>);
//   const linkElement = screen.getByText(/ellen_ripley/i);
//   expect(linkElement).toBeInTheDocument();
// });
//
// test('user list renders async', async () => {
//   const users = await findAllUsers();
//   render(
//     <HashRouter>
//       <UserList users={users}/>
//     </HashRouter>);
//   const linkElement = screen.getByText(/xx/i);
//   expect(linkElement).toBeInTheDocument();
// })
//
// describe('user list renders mocked',  () => {
//   test('user list renders mocked', async () => {
//     axios.get = jest.fn();
//     jest.mock('axios');
//     axios.get
//         .mockImplementationOnce(
//             () => Promise
//                 .resolve({ data: {users: MOCKED_USERS} }));
//     const response = await findAllUsers();
//     const users = response.users;
//
//     render(
//         <HashRouter>
//           <UserList users={users}/>
//         </HashRouter>);
//
//     const user = screen.getByText(/ellen_ripley/i);
//     expect(user).toBeInTheDocument();
//   });
// });
//
//
