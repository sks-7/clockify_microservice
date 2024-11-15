import {
  Input,
  Box,
  Button,
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
import { Flex } from '@chakra-ui/react';

const getData = async () => {
  let res = await axios.get('http://localhost:9002/tag');

  return res.data;
};

function Tagsection() {
  const [tag, setTags] = useState('');
  const [Alltags, seTAllTags] = useState([]);
  const [search, setSearch] = useState('');

  console.log(tag);

  useEffect(() => {
    getData().then((res) => {
      seTAllTags(res);
    });
  }, []);

  console.log(tag);

  const handalAdd = async () => {
    await axios.post('http://localhost:9002/tag/new', {
      name: tag,
    });

    getData().then((res) => {
      seTAllTags(res);
    });
  };

  const handleDelete = async (id) => {
    // console.log(id);
   await axios.get(`http://localhost:9002/tagdelete/${id}`);
    getData().then((res) => {
      seTAllTags(res);
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
              Tags
            </Text>

            <Flex borderEndColor={"red"} justifyContent="space-between" alignItems={"center"} width={"100%"} boxShadow={"md"} padding={"2px"} borderRadius={"5px"}>
              <div style={{ display: 'flex' }}>
                <Select
                  placeholder="Show active"
                  htmlSize={8}
                  width="160px"
                  mr="15px"
                  border={"none"}
                  focusBorderColor='blue'

                >
                  <option value="option2">Show archived</option>
                  <option value="option3">Show all</option>
                </Select>

                <Input
                  placeholder="Search by tags name"
                  htmlSize={8}
                  width="190px"
                  border={"none"}
                  focusBorderColor='blue'
                  mr={600}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  name="client"
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add new Tags"
                  htmlSize={12}
                  width="140px"
                  mr="15px"
                  border={"none"}
                  focusBorderColor='blue'


                />
                <Button
                  colorScheme="blue"
                  px="10"
                  py="10px"
                  onClick={handalAdd}
                  border={"none"}
                  focusBorderColor='blue'


                >
                  Add
                </Button>
              </div>
            </Flex>

            <Box bg="gray.50" mt={30} w="100%" color="gray.600">
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Alltags &&
                    Alltags.filter((ele) => {
                      if (search === '') {
                        return ele;
                      } else if (
                        ele.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return ele;
                      }
                    }).map((ele) => (
                      <Tr
                        key={ele._id}
                        bg="white"
                        _hover={{ background: 'gray.100' }}
                      >
                        <Td fontSize="15px" fontWeight="bold" color="gray.800">
                          {ele.name}
                        </Td>
                        <Td>
                          <IconButton
                            aria-label="Delete tag"
                            icon={<AiFillDelete />}
                            onClick={() => handleDelete(ele.id)}
                            colorScheme="red"
                            variant="ghost"
                            _hover={{ color: 'red.500' }}
                            _focus={{ outline: 'none' }}
                            fontSize={'20px'}
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

export default Tagsection;
