import { Button } from '@/utils/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/utils/ui/collapsible'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/utils/ui/hover-card'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'
import PostReplies from './PostReplies'

const ToggleReplies = ({showReplies,setShowReplies,replies,userId}) => {
  return (
    <Collapsible
        open={showReplies}
        onOpenChange={setShowReplies}
        className="w-full space-y-2 bg-white rounded-lg p-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <div className='flex gap-2 w-full items-center'>
          <HoverCard>
              <HoverCardTrigger asChild>
                            
                  <div className="rounded-md border px-4 py-3 font-mono text-sm w-full font-bold">
                  {showReplies ? 'Hide Replies' : 'Show Replies'}
                  </div>
                
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-light-3">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@Info</h4>
                    <div className='flex items-center gap-2'>
                      <p className="text-sm">
                        To show replies click on 
                      </p>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />                
                      </Button>
                    </div>
                    <div className="flex items-center pt-2">
                    </div>
                  </div>
                </div>
              </HoverCardContent>
          </HoverCard>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />                
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="space-y-2">
          <PostReplies repliesArray={replies} userId={userId} />
        </CollapsibleContent>
      </Collapsible>
  )
}

export default ToggleReplies