import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container,
    Spacer,
    BreadcrumbLink,
    Breadcrumb,
    BreadcrumbItem,
} from '@chakra-ui/react';
import logo from '../../logo.svg';
import './NavBar.css'
import { FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import MetaMaskCard from '../Wallet/connectorCards/MetaMaskCard';
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    // const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const { t, i18n } = useTranslation();
    // const { id } = useParams();
    const location = useLocation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const renderSubmenu = () => {
        const CTF_NAV_ITEMS: Array<NavItem> = [
            {
                label: 'Challenges',
                href: '/ctf'
            },
            {
                label: 'Leaderboard',
                href: '/ctf/leaderboard'
            },
        ];

        const TOOLS_NAV_ITEMS: Array<NavItem> = [
            {
                label: 'zk-hashes',
                href: '/tools/zk-hashes'
            },
            {
                label: 'toabi',
                href: '/tools/toabi'
            },
        ];

        if (location.pathname.includes("ctf")) {

            return <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
                {CTF_NAV_ITEMS.map((navItem) => (
                    <BreadcrumbItem key={navItem.label}>
                        <BreadcrumbLink href={navItem.href}><b></b>{navItem.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>

            // return <p>ctf submenu</p>;
        } else if (location.pathname.includes("dao")) {
            return <p></p>;

        }
        else if (location.pathname.includes("edu")) {
            return <p></p>;

        }
        else if (location.pathname.includes("faucet")) {
            return <p></p>;

        }
        else if (location.pathname.includes("tools")) {
            return <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
                {TOOLS_NAV_ITEMS.map((navItem) => (
                    <BreadcrumbItem key={navItem.label}>
                        <BreadcrumbLink href={navItem.href}><b></b>{navItem.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>

        }
        else {
            return <p></p>
        }
    }

    return (
        <Box>
            <Container as={Stack} maxW={'7xl'} >

                <Flex
                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}>
                    <Flex
                        flex={{ base: 1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}>
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                        <img src={logo} style={{ height: 24 }} className="app-logo" alt="positive web3 security" />
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}>
                            <Link
                                p={2}
                                href="/"
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                Positive | web3 security
                            </Link>
                        </Text>

                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    <Stack
                        // flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>

                        <Link
                            href="https://twitter.com/PositiveWeb3"
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>

                            <Icon as={FaTwitter} w={5} h={5} />
                        </Link>

                        <Link
                            href="https://t.me/PositiveWeb3"
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>

                            <Icon as={FaTelegram} w={5} h={5} />
                        </Link>


                        <Link
                            // p={2}
                            href="https://github.com/positivesecurity"
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>
                            <Icon as={FaGithub} w={5} h={5} color={'black'} />
                        </Link>

                        {/* <Link
                            href="https://mirror.xyz/0xB085040c28fdC4eF12Eb5E3B25b44E0dbCBA6b4A"
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>

                            {t("mirror")}
                        </Link>

                        */}

                        {/* <Link
                            // p={2}
                            href="#"
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}>
                            <Button
                                as={'a'}
                                fontSize={'sm'}
                                fontWeight={400}
                                variant={'link'}
                                href={'#'}>
                                connect
                            </Button>
                        </Link> */}

                        {/* 
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            href={'#'}
                            _hover={{
                                bg: 'pink.300',
                            }}>
                            Sign Up
                        </Button> 
                        */}


                        {/* <button type="button" onClick={() => changeLanguage('en')}>
                            en
                        </button>

                        <button type="button" onClick={() => changeLanguage('ru')}>
                            ru
                        </button> */}

                    </Stack>
                </Flex>

                <Flex
                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'20px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}>

                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>

                        <Box p='0'>
                            {
                                renderSubmenu()
                            }
                        </Box>
                        <Spacer />
                        <Box p='0'>
                            <Link
                                href="#"
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                <MetaMaskCard />
                            </Link>
                        </Box>

                    </Flex>

                    {/* <Stack
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                    </Stack> */}
                </Flex>


                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Container>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                as={ReactRouterLink}
                                p={2}
                                to={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string | any;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'blog',
        href: 'https://blog.positive.com'
    },
    {
        label: 'ctf',
        href: 'ctf'
    },
    // {
    //     label: 'dao',
    //     href: 'dao'
    // },
    // {
    //     label: <Icon as={FaGithub} w={5} h={5} />,
    //     href: 'https://github.com/PositiveSecurity',
    // },
    // {
    //     label:   <Icon as={FaTelegram} w={5} h={5} />,
    //     href: 'https://t.me/PositiveSecurity',
    // },
    // {
    //     label: 'edu',
    //     href: 'edu',
    // },
    // {
    //     label: 'tools',
    //     href: 'tools',
    // },
    // {
    //     label: 'positoken',
    //     href: 'positoken',
    // },
];