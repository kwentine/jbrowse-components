import React from 'react'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { observer } from 'mobx-react'
import pluralize from 'pluralize'

// icons
import ViewListIcon from '@mui/icons-material/ViewList'
import { AbstractSessionModel, sum } from '@jbrowse/core/util'

// locals
import { SessionSnap } from './util'

const SessionListItem = observer(function ({
  session,
  sessionSnapshot,
  onClick,
  secondaryAction,
}: {
  sessionSnapshot: SessionSnap
  session: AbstractSessionModel
  onClick: () => void
  secondaryAction?: React.ReactNode
}) {
  const { views = [] } = sessionSnapshot || {}
  const totalTracks = sum(views.map(view => view.tracks?.length ?? 0))
  const n = views.length

  return (
    <ListItem secondaryAction={secondaryAction}>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText
          primary={sessionSnapshot.name}
          secondary={
            session.name === sessionSnapshot.name
              ? 'Currently open'
              : `${n} ${pluralize('view', n)}; ${totalTracks} open ${pluralize(
                  'track',
                  totalTracks,
                )}`
          }
        />
      </ListItemButton>
    </ListItem>
  )
})

export default SessionListItem
