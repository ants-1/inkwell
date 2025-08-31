"use client"

import { useState } from "react";
import { Badge, Box, HStack, Text } from "@chakra-ui/react"
import { Note } from "../types/Note";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { author, content, date, tags } = note;
  const [isExpanded, setIsExpanded] = useState(false);

  const isLong = content.length > 500;
  const displayedContent = isExpanded ? content : content.substring(0, 500);

  return (
    <Box backgroundColor="gray.700" p="6" rounded="md" maxW="2xl" w="full">
      <Text color="white" fontSize="sm" mb="4">
        {displayedContent}
        {(!isExpanded && isLong) && "..."}
      </Text>

      {isLong && (
        <Text
          onClick={() => setIsExpanded(!isExpanded)}
          color="white" fontWeight="bold" fontSize="sm" w="fit"
          _hover={{ cursor: "pointer" }}
          mb="4"
          mt="-3"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Text>
      )}

      <HStack spaceX="2" my="2">
        {tags.map((tag: any, i: number) => (
          <Badge key={i} size="md" colorPalette="blue">
            {tag}
          </Badge>
        ))}
      </HStack>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text color="white" fontWeight="bold" fontSize="sm">
          {author}
        </Text>
        <Text color="white" fontSize="sm">
          Created: {date}
        </Text>
      </Box>
    </Box>
  )
}
