import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  Box,
  Flex,
  SimpleGrid,
  useMediaQuery,
  Text,
  Button,
} from '@chakra-ui/react';
import Inner_Navbar from '../Time_Tracker/SideBar/Inner_Navbar';
import SideBar from '../Time_Tracker/SideBar/SideBar';
import { IoMdOptions } from 'react-icons/io';
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

const BarGraph = () => {
  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  useEffect(() => {
    // fetch data from API
    const fetchData = async () => {
      const response = await fetch('http://localhost:9002/client');
      const jsonData = await response.json();
      const chartData = jsonData.data.slice(0, 5).map((client) => ({
        name: client.name,
        address: client.address,
      }));
      setData(chartData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // fetch data from API
    const fetchData1 = async () => {
      const response = await fetch('http://localhost:9002/project');
      const jsonData = await response.json();
      const chartData = jsonData.slice(0, 5).map((project) => ({
        name: project.name,
        tag: project.tag,
      }));
      setProjectData(chartData);
    };
    fetchData1();
  }, []);

  // http://localhost:8080//project

  const option = {
    title: {
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Client Data', 'Project Data'],
      top: '5%',
      left: 'center',
    },
    grid: {
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: data.map((client) => client.name),
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Client Data',
        type: 'bar',
        data: data.map((client) => client.address.length),
        emphasis: {
          focus: 'series',
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
      },
      {
        name: 'Project Data',
        type: 'bar',
        data: projectData.map((project) => project.tag.length),
        emphasis: {
          focus: 'series',
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
  };

  return (
    <>
      <Inner_Navbar />
      <Flex>
        <Box>
          {isLargerThan1280 ? (
            <SideBar />
          ) : (
            <Box>
              <Popover>
                <PopoverTrigger>
                  <Button>
                    {
                      <IoMdOptions
                        style={{
                          fontSize: '60px',
                          color: 'red',
                          marginTop: '40px',
                        }}
                      />
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>{<SideBar />}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          )}
        </Box>

        <Box
          maxH={['4xl', 'xl']}
          w={['100%', '', '90%']}
          overflow={{ sm: 'auto', md: 'hidden', lg: 'hidden' }}
        >
          <SimpleGrid column={1}>
            <Box w="100%" h={['600px', '400px']} mt={['30px', '30px']} m="auto">
              <ReactEcharts lazyUpdate={true} option={option} />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default BarGraph;
