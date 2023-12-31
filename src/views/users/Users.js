/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import { useState, useEffect } from 'react';
import { Card, CardHeader, Button, Media, Table, Container, Row } from 'reactstrap';

// core components
import AddUser from './AddUser';
import EditUser from './EditUser';
import Header from 'components/Headers/Header.js';
import { connectSocket } from 'utils/socket';
import { socket } from 'utils/socket';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDataFromLocal();
    getDataFromSocket();
  }, []);

  const getDataFromLocal = () => {
    const data = localStorage.getItem('users');
    if (data) {
      const localData = JSON.parse(data);
      setUsers(localData);
    }
  };
  const getDataFromSocket = () => {
    connectSocket();
    if (socket) {
      // Login user
      socket?.on('user-login', (res) => {
        const data = { ...res?.google, action: 'login', description: res?.description };
        const getData = localStorage.getItem('users');
        let localUsers = [];
        if (getData) {
          const allUsers = JSON.parse(getData);
          localUsers = allUsers;
        }
        localUsers.push(data);
        localStorage.setItem('users', JSON.stringify(localUsers));
        setUsers([...users, data]);
      });

      // New Post
      socket?.on('newPost', (res) => {
        const data = { ...res, action: 'newPost', description: res?.description ?? 'New post' };
        const getData = localStorage.getItem('users');
        let localUsers = [];
        if (getData) {
          const allUsers = JSON.parse(getData);
          localUsers = allUsers;
        }
        localUsers.push(data);
        localStorage.setItem('users', JSON.stringify(localUsers));
        setUsers([...users, data]);
      });

      // New Comment
      socket?.on('newComment', (res) => {
        const data = {
          ...res,
          action: 'newComment',
          description: res?.description ?? 'New comment',
        };
        const getData = localStorage.getItem('users');
        let localUsers = [];
        if (getData) {
          const allUsers = JSON.parse(getData);
          localUsers = allUsers;
        }
        localUsers.push(data);
        localStorage.setItem('users', JSON.stringify(localUsers));
        setUsers([...users, data]);
      });

      // Like Post
      socket?.on('postUpdate', (res) => {
        const data = {
          ...res,
          action: 'postUpdate',
          description: res?.description ?? 'Like post',
        };
        const getData = localStorage.getItem('users');
        let localUsers = [];
        if (getData) {
          const allUsers = JSON.parse(getData);
          localUsers = allUsers;
        }
        localUsers.push(data);
        localStorage.setItem('users', JSON.stringify(localUsers));
        setUsers([...users, data]);
      });
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <div className='d-flex justify-content-between '>
                  <h3 className='mb-0'>Users</h3>
                </div>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((item) => {
                    return (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>
                            <Media>
                              <span className='mb-0 text-sm' title={item.name}>
                                {item.name?.length > 30
                                  ? item.name?.substring(0, 30) + '...'
                                  : item.name}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td title={item.email}>
                          {item.email?.length > 30
                            ? item.email?.substring(0, 30) + '...'
                            : item.email}
                        </td>
                        <td>{item.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* ///////////     Pagination Disabled Temp     ///////////// */}

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Users;
