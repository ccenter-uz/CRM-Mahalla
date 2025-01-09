import { scssVariables } from '@/@core/application/utils/vars'
import { Link } from '@/navigation'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Icon, Text } from '@chakra-ui/react'
import React from 'react'

interface SubMenuI {
    id: number;
    title: string;
    href: string;
    icon: any; // Assuming icon is a React component
  }
  
  interface LinkI {
    id: number;
    title: string;
    href: string;
    icon: any; // Assuming icon is a React component
    subMenu: SubMenuI[];
  }

const SidebarLinkUI = ({link, pathname, locale} : {link: LinkI, pathname?: string, locale?: string}) => {
  return (
    <Accordion key={link.id} allowMultiple>
      <AccordionItem border={"none"}>
        <AccordionButton
                    as={Link}
                    href={link.href}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={{
                      base: "none",
                      sm: "center",
                      md: "space-between",
                    }}
                    color={"#fff"}
                    fontSize={scssVariables.fonts.span}
                    className={`${
                      pathname == `/${locale}${link.href}` ? "active" : ""
                    }`}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"10px"}
                    >
                      <Icon
                        as={link.icon}
                        color={"#fff"}
                        w={"18px"}
                        h={"18px"}
                      />
                      <Text display={{ sm: "none", md: "flex", xl: "flex" }}>
                        {link.title}
                      </Text>
                    </Box>
                    {link.subMenu && <AccordionIcon />}
                  </AccordionButton>
                  {link.subMenu &&
                    link.subMenu.map((subLink) => (
                      <AccordionPanel
                        key={subLink.id}
                        p={"0"}
                        className={`${
                          pathname == `/${locale}${subLink.href}`
                            ? "active"
                            : ""
                        }`}
                      >
                        <Button
                          w={"100%"}
                          as={Link}
                          href={subLink.href}
                          bg={"none"}
                          _hover={{ bg: "rgba(0,0,0,0.05)" }}
                          color={"lightgrey"}
                          borderRadius={"0"}
                          h={"35px"}
                          fontSize={scssVariables.fonts.span}
                        >
                          <Box
                            w={"100%"}
                            display={"flex"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Icon
                              as={subLink.icon}
                              color={"#fff"}
                              w={"12px"}
                              h={"12px"}
                            />
                            <Text>{subLink.title}</Text>
                          </Box>
                        </Button>
                      </AccordionPanel>
                    ))}
                </AccordionItem>
              </Accordion>
  )
}

export default SidebarLinkUI