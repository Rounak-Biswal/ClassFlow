import { CreateButton } from '@/components/refine-ui/buttons/create'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Input } from '@/components/ui/input'
import { DEPARTMENT_OPTIONS } from '@/constants'
// import { Select, SelectContent, SelectItem, SelectPortal, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useTable } from '@refinedev/core'
import { Subject } from '@/types'

const SubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const subjectTable = useTable<Subject>()
  return (
    <ListView>
      <Breadcrumb />

      <h1 className='page-title'>Subjects</h1>
      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>
        <div className="actions-row">
          <div className="search-field">
            <Search className='search-icon' />
            <Input
              type="text"
              placeholder='search by name..'
              className='pl-10 w-full'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDept}
              onValueChange={setSelectedDept}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>
                  All Departments
                </SelectItem>
                {DEPARTMENT_OPTIONS.map(option => (
                  <SelectItem
                    value={option.value}
                    key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CreateButton /> 
          </div>
        </div>
      </div>
    </ListView>
  )
}

export default SubjectsList