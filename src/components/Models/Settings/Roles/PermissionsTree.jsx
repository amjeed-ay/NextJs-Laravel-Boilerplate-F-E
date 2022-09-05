import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import { tailwindConfig } from '@/utils/Utils'
import { memo } from 'react'
import { useCrud } from '@/hooks/crud'

function PermissionsTree({ setFieldValue, values }) {
    const { data: permissions } = useCrud({
        route: 'permissions',
        callApi: true,
    })

    const hasSelectedChild = nodes => {
        if (nodes === null) return false
        // sai a sakashi ciki
        if (Array.isArray(nodes.children)) {
            return nodes.children.some(item => values.includes(item.id))
        }

        return false
    }

    const hasUnSelectedChild = nodes => {
        if (nodes === null) return false
        // sai a sakashi ciki
        if (Array.isArray(nodes.children)) {
            return nodes.children.some(item => !values.includes(item.id))
        }

        return false
    }

    //node is always the root "Parent"
    //id is id of node clicked
    function getChildById(node, id) {
        let array = []

        //returns an array of nodes ids: clicked node id and all children node ids
        function getAllChild(nodes) {
            if (nodes === null) return []
            array.push(nodes.id) // sai a sakashi ciki
            if (Array.isArray(nodes.children)) {
                //idan yana da yaya' suma sai a tache su
                nodes.children.forEach(node => {
                    array = [...array, ...getAllChild(node)] // aka dauko saura sannan aka sa nemo id

                    array = array.filter((v, i) => array.indexOf(v) === i) // arrange and filter duplicate
                })
            }
            return array
        }

        //returns the node object that was values
        function getNodeById(nodes, id) {
            if (nodes.id === id) {
                return nodes
            } else if (Array.isArray(nodes.children)) {
                let result = null
                nodes.children.forEach(node => {
                    if (getNodeById(node, id)) {
                        result = getNodeById(node, id)
                    }
                })
                return result
            }

            return null
        }

        return getAllChild(getNodeById(node, id))
    }

    function getOnChange(checked, nodes) {
        //gets all freshly values or unselected nodes
        const allNode = getChildById(
            permissions?.find(itm => itm.model === nodes.model),
            nodes.id,
        )
        //combines newly values nodes with existing selection
        //or filters out newly deselected nodes from existing selection
        let array = checked
            ? [...values, ...allNode]
            : values.filter(value => !allNode.includes(value))
        array = array.filter(
            (v, i) => array.indexOf(v) === i && typeof v != 'string',
        )
        setFieldValue('permissions', array)
    }

    const RenderTreeWithCheckboxes = nodes => {
        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.title}
                label={
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableRipple
                                checked={
                                    values.some(item => item === nodes.id) ||
                                    hasSelectedChild(nodes)
                                }
                                indeterminate={
                                    hasSelectedChild(nodes) &&
                                    hasUnSelectedChild(nodes)
                                }
                                onChange={event =>
                                    getOnChange(
                                        event.currentTarget.checked,
                                        nodes,
                                    )
                                }
                                sx={{
                                    color: tailwindConfig().theme.colors
                                        .theme[1],
                                    '&.Mui-checked': {
                                        color: tailwindConfig().theme.colors
                                            .theme[1],
                                    },
                                }}
                            />
                        }
                        label={nodes.title}
                        key={nodes.id}
                    />
                }>
                {Array.isArray(nodes.children)
                    ? nodes.children.map(node => RenderTreeWithCheckboxes(node))
                    : null}
            </TreeItem>
        )
    }

    if (!permissions) return <CircularProgress size={13} color="inherit" />
    return (
        <>
            {permissions.map((item, i) => (
                <TreeView
                    key={i}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['0', '3', '4']}
                    defaultExpandIcon={<ChevronRightIcon />}>
                    {RenderTreeWithCheckboxes(item)}
                </TreeView>
            ))}
        </>
    )
}

export default memo(PermissionsTree)
