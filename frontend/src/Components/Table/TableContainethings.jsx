import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Badge,
} from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';



import { useEffect, useState } from 'react';
import axios from 'axios';

// import './modal.css'

export const getData2 = async () => {
  let res = await axios.get('http://localhost:9002/project');

  return res.data;
};

const TableContainethings = () => {
  const [Allclient, setAllclient] = useState([]);

  const [selectedClients, setSelectedClients] = useState([]);

  console.log(Allclient);

  useEffect(() => {
    getData2().then((res) => {
      setAllclient(res);
    });
  }, [Allclient]);

  const handleDelete = async (id) => {
    console.log(id);
    await axios.get(`http://localhost:9002/projectdelete/${id}`);
    getData2().then((res) => {
      setAllclient(res);
    });
  };

  // ----------check box --------------

  const handleCheckboxClick = (id) => {
    setSelectedClients((prevSelectedClients) => {
      if (prevSelectedClients.includes(id)) {
        return prevSelectedClients.filter((clientId) => clientId !== id);
      } else {
        return [...prevSelectedClients, id];
      }
    });
  };

  return (
    <>
      <Box bg="aliceblue" h="30" w="100%" color="grey">
        <Text fontSize="md" px={5}>
          Projects
        </Text>
      </Box>

      <TableContainer>
        <Table variant="striped" colorScheme="blue.100">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>NAME</Th>
              <Th>CLIENT</Th>
              <Th>AMOUNT</Th>
              <Th>STATUS</Th>
              <Th>ACCESS</Th>
              <Th>FAVOURITES</Th>
              <Th>EDIT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Allclient &&
              Allclient?.map((ele) => (
                <Tr
                  key={ele.id}
                  bg={
                    selectedClients.includes(ele?.id) ? 'green.300' : 'blue.100'
                  }
                >
                  <Td>
                    <Checkbox
                      mt={3}
                      px={5}
                      onChange={() => handleCheckboxClick(ele.id)}
                    ></Checkbox>
                  </Td>
                  <Td>{ele?.name}</Td>
                  <Td>{ele?.useremail}</Td>
                  <Td>0.00h</Td>
                  <Td>
                    {selectedClients.includes(ele?.id) ? (
                      <Badge colorScheme="green">Completed</Badge>
                    ) : (
                      <Badge colorScheme="red">Not completed</Badge>
                    )}
                  </Td>
                  <Td>public</Td>
                  <Td>
                    <AiOutlineStar
                      style={{ fontSize: '20px', marginLeft: '18px' }}
                    />
                  </Td>
                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <Button>
                          <BsThreeDotsVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>select</PopoverHeader>

                        <PopoverBody
                          style={{ cursor: 'pointer' }}
                          _hover={{ background: 'red', color: 'white' }}
                          onClick={() => handleDelete(ele.id)}
                        >
                          Archive
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableContainethings;
