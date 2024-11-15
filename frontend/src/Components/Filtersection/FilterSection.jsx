import React, { useState } from 'react';
import './filterswection.css';

import {
  Box,
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  Portal,
  Text,
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
  PopoverAnchor,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import ProjectHead from '../modal/ProjectHead';
import TableContainethings from '../Table/TableContainethings';
import SideBar from '../Time_Tracker/SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import Inner_Navbar from '../Time_Tracker/SideBar/Inner_Navbar';

const FilterSection = () => {
  return (
    <>
      <Box>
        <Inner_Navbar />
      </Box>
      <div style={{ display: 'flex', marginTop: '0px' }}>
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
          <ProjectHead />

          <div className="container">
            <table width="50%">
              <tr>
                <th>Filter</th>
                <th>
                  <select name="" id="">
                    <option>Active</option>
                    <option>Archived</option>
                    <option>All</option>
                  </select>
                </th>

                <th>
                  <Popover>
                    <PopoverTrigger>
                      <Button bg={'none'} _hover={{ background: 'none' }}>
                        Client
                      </Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Clints</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Input
                            mt={5}
                            mb={5}
                            placeholder="Search client"
                            _hover={{ boxShadow: '2xl' }}
                          />
                        </PopoverBody>
                        <PopoverFooter>No clients left</PopoverFooter>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </th>

                <th>
                  <Popover>
                    <PopoverTrigger>
                      <Button bg={'none'} _hover={{ background: 'none' }}>
                        Access
                      </Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Access</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Input
                            mt={5}
                            mb={5}
                            placeholder="Search client"
                            _hover={{ boxShadow: '2xl' }}
                          />
                          <Checkbox>Select All</Checkbox>
                        </PopoverBody>

                        <PopoverFooter>
                          <Text fontSize="xl" mb={2}>
                            Users
                          </Text>
                          <Checkbox>Users</Checkbox>
                        </PopoverFooter>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </th>

                <th>
                  <Popover>
                    <PopoverTrigger>
                      <Button bg={'none'} _hover={{ background: 'none' }}>
                        Billing
                      </Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Billing</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Checkbox mr={3}>Billable</Checkbox>
                          <Checkbox>Non billable</Checkbox>
                        </PopoverBody>
                        <PopoverFooter></PopoverFooter>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </th>
              </tr>
            </table>

            <div className="search">
              <div>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <AiOutlineSearch color="pink.300" fontSize={'25px'} />
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Search..."
                    focusBorderColor="pink.400"
                    _placeholder={{ opacity: 1, color: 'pink.500' }}
                    _hover={{ boxShadow:'2xl' }}
                  />
                </InputGroup>
              </div>
            </div>

            <Button bg="blue.500" color={'white'} _hover={{color:"white",bg:"blue.600"}}>
              APPLY FILLTER
            </Button>
          </div>

          <TableContainethings />
        </div>
      </div>
    </>
  );
};

export default FilterSection;
