'use client'

import { AUTH_LOGOUT } from '@/stores/rootReducer';
import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { ReactText } from 'react';
import { IconType } from 'react-icons';
import {
  FiCompass,
  FiHome,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi';
import { RiZzzFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ColorModeToggle from './darkmode';
import { SearchIcon } from '@chakra-ui/icons';




interface LinkItemProps {
  name: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
]



export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
 
  
  return (
    <Box minH="100vh" >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block'}} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
     
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  function LOGOUT(){
   
      
         dispatch(AUTH_LOGOUT())
         navigate('/auth/signin') 
    }
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
       
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Icon fontSize={"40px"} as={RiZzzFill}> </Icon>
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Box mr="2" ml="2" gap={4} display={"flex"}>
      <Input w={"180px"} placeholder='Search ' />
      <IconButton aria-label='Search database' icon={<SearchIcon />} />
      </Box>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
        
      ))}
      
      <ColorModeToggle/>
      <Box mt={"100px"} ml={"20px"} >
      <Button w={"200px"} onClick={LOGOUT}>
    Logout
  </Button>
 
      </Box>
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
 
  return (
   
 
    <Box
      as="a"
      href="/"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
   
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      
    </Flex>
  )
}