"use client";

import { Box, VStack, Menu, Portal } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { NotepadText, UsersRound, Wrench, UserRound } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const sidebarItems = [
  { href: "/notes", icon: NotepadText, tooltip: "My Notes" },
  { href: "/teams", icon: UsersRound, tooltip: "Teams" },
  { href: "/settings", icon: Wrench, tooltip: "Settings" },
];

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <Box
      w={{ base: "16", md: "20" }}
      minH="dvh"
      position="fixed"
      top="0"
      left="0"
      backgroundColor="gray.700"
      pt="5"
    >
      <VStack display="flex" alignItems="center" gap="2" height="full" >
        {sidebarItems.map(({ href, icon: Icon, tooltip }, i) => (
          <Link key={i} href={href}>
            <Tooltip content={tooltip}>
              <Box boxSize={{ base: 10, md: 11 }} p="2" _hover={{ backgroundColor: "gray.900" }} rounded="xl">
                <Icon color="white" height="full" width="full" />
              </Box>
            </Tooltip>
          </Link>
        ))}
        <Menu.Root>
          <Menu.Trigger asChild>

            <Box boxSize={{ base: 10, md: 11 }} p="2" _hover={{ backgroundColor: "gray.900" }} rounded="xl">
              <Tooltip content={session ? "User" : "Login/Sign-Up"}>
                <UserRound color="white" height="full" width="full" cursor="pointer" />
              </Tooltip>
            </Box>

          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content backgroundColor="gray.900">
                {session ? (
                  <Box >
                    <Link href="/profile">
                      <Menu.Item
                        value="profile"
                        color="white"
                        cursor="pointer"
                      >
                        Profile
                      </Menu.Item>
                    </Link>
                    <Link href="/notes">
                      <Menu.Item
                        value="logout"
                        color="white"
                        onClick={() => signOut()}
                        cursor="pointer"
                      >
                        Logout
                      </Menu.Item>
                    </Link>
                  </Box>
                ) : (
                  <Box>
                    <Link href="/login">
                      <Menu.Item
                        value="login"
                        color="white"
                        cursor="pointer"
                      >
                        Login
                      </Menu.Item>
                    </Link>
                    <Link href="/sign-up">
                      <Menu.Item
                        value="sign-up"
                        color="white"
                        cursor="pointer"
                      >
                        Sign-Up
                      </Menu.Item>
                    </Link>
                  </Box>
                )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </VStack>
    </Box>
  );
}
