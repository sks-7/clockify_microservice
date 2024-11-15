import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Spacer,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../Time_Tracker/SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import Inner_Navbar from '../Time_Tracker/SideBar/Inner_Navbar';
import { AiFillDelete } from 'react-icons/ai';

const getClientData = async () => {
  let res = await axios.get('http://localhost:9002/client');

  console.log(res)

  return res.data.data;
};

function Clientsection() {
  const [client, setClient] = useState('');
  const [Allclient, setAllclient] = useState([]);
  const [search, setSearch] = useState('');

  // console.log(Allclient);

  useEffect(() => {
    getClientData().then((res) => {
      setAllclient(res);
    });
  }, []);

  console.log(client);

  const handalAdd = async () => {
    await axios.post('http://localhost:9002/client/new', {
      name: client,
      address:'something'
    });

    getClientData().then((res) => {
      setAllclient(res);
    });
  };

  const handleDelete = async (id) => {
    // console.log(id);
     await axios.get(`http://localhost:9002/clientdelete/${id}`);
    getClientData().then((res) => {
      setAllclient(res);
    });

    // add delete effect add karna hai
  };

  return (
    <>
      <Box>
        <Inner_Navbar />
      </Box>
      <div style={{ display: 'flex' }}>
        <div>
          <SideBar />
        </div>
        <div
          style={{
            background: '#f2f6f8',
            paddingTop: '4rem',
            marginTop: '0px',
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <div>
            <Text fontSize="xl" mb={30} px="4" py="4">
              Clients
            </Text>

            <Flex justifyContent="space-between">
              <div style={{ display: 'flex' }}>
                <Select
                  placeholder="Show active"
                  htmlSize={8}
                  width="150px"
                  mr="15px"
                >
                  <option value="option2">Show archived</option>
                  <option value="option3">Show all</option>
                </Select>

                <Input
                  placeholder="Search by client name"
                  htmlSize={8}
                  width="150px"
                  mr={600}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  name="client"
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Add new client"
                  htmlSize={12}
                  width="150px"
                  mr="15px"
                />
                <Button
                  colorScheme="blue"
                  px="10"
                  py="10px"
                  onClick={handalAdd}
                >
                  Add
                </Button>
              </div>
            </Flex>

            <Box bg="aliceblue" mt={30} w="100%" color="gray.600">
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Allclient && Allclient.length>0 &&
                    Allclient?.filter((ele) => {
                      if (search === '') {
                        return ele;
                      } else if (
                        ele.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return ele;
                      }
                    }).map((ele) => (
                      <Tr key={ele?.id} bg="white">
                        <Td fontSize="15px" fontWeight="bold" color="gray.800">
                          {ele?.name}
                        </Td>
                        <Td fontSize="15px" fontWeight="bold" color="pink.400">
                          {ele?.address}
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Delete client"
                            icon={<AiFillDelete />}
                            onClick={() => handleDelete(ele?.id)}
                            colorScheme="red"
                            variant="ghost"
                            _hover={{ color: 'red.500' }}
                            _focus={{ outline: 'none' }}
                            fontSize={'xl'}
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clientsection;
