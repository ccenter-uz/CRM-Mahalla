"use client";
import { adminlinks, executorlinks, userlinks } from "@/@core/application/helper/links";
import { scssVariables } from "@/@core/application/utils/vars";
import { Link } from "@/navigation";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useLang } from "@/@core/shared/hook/useLang";
import { usePathname } from "next/navigation";
import Cookie from "js-cookie";
import SidebarLinkUI from "@/@core/shared/ui/SidebarLinkUI";

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

export const Sidebar = () => {
  const { locale } = useLang();
  const pathname = usePathname();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const roleUser = Cookie.get("role");
    if (roleUser) setRole(roleUser);
  }, []);

  return (
    <Box
      display={{ base: "none", sm: "block", md: "block", xl: "block" }}
      w={{ base: "0", sm: "70px", md: "324px", xl: "324px" }}
      transition={"width 0.3s linear"}
      h={"100%"}
      maxH={"100dvh"}
      bg={scssVariables.primary}
      p={{ base: "8px", sm: "8px", md: "10px 20px 20px", xl: "10px 20px 20px" }}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.10)"}
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        mb={{ sm: "10px", md: "20px", xl: "20px" }}
      >
        <img
          src="/logoZip.webp"
          alt="logo"
          loading="lazy"
          width={74}
          height={74}
        />
        <Text
          color={"whitesmoke"}
          fontSize={{ base: "0", sm: "13px", md: "16px", xl: "16px" }}
          fontWeight={500}
          textAlign={"center"}
        >
          Ўзбекистон маҳаллалари уюшмаси
        </Text>
      </Flex>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderTop={"1px solid rgba(255, 255, 255, 0.6)"}
        pt={"1em"}
      >
        {role === "admin"
          ? adminlinks.map((link, id) => (
            <SidebarLinkUI key={id} link={link as LinkI} pathname={pathname} locale={locale}/>
            ))
          : role === "user" ? userlinks.map((link, id) => (
            <SidebarLinkUI key={id} link={link as LinkI}  pathname={pathname} locale={locale}/>
            ))
          : role === "executor" ? executorlinks.map((link, id) => (
            <SidebarLinkUI key={id} link={link as LinkI}  pathname={pathname} locale={locale}/>
          )) 
          : null}
      </Box>
    </Box>
  );
};
