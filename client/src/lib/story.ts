import { storyNodes, type StoryNode } from "@shared/schema";

export function getStoryNode(id: StoryNode) {
  return storyNodes[id];
}

export function isValidChoice(currentNode: StoryNode, choice: string): choice is StoryNode {
  return storyNodes[currentNode].choices.some(c => c.id === choice);
}
