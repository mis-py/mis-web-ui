import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useGetUsersQuery } from "redux/api/usersApi";

const UserSelector = ({users, onUsersChange }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [remainingUsers, setRemainingUsers] = useState([]);

    const { data: usersList = [] } = useGetUsersQuery();

    useEffect(() => {
        setSelectedUsers(users ? users.map(item => {
            return {
                value: item.id,
                label: item.username,
            }
        }) : []);
    }, [users]);

    useEffect(() => {
        let newRemainig = usersList.filter(item=>item.team == null).map(item => {
            return {
                value: item.id,
                label: item.username,
            }
        });
        setRemainingUsers(newRemainig);
    }, [usersList]);

    const onSelectChange = (value, event) => {
        // console.log(value, event);
        let newSelected = [], newRemaining = [];

        switch (event.action){
            case 'select-option':
                newSelected = value;
                newRemaining = remainingUsers.filter((item) => item.value != event.option.value);
                break;
            case 'remove-value':
            case 'pop-value':
                newSelected = value;
                newRemaining = remainingUsers.concat(event.removedValue);
                break;
            case 'clear':
                newRemaining = [...event.removedValues, ...remainingUsers]
                break;
            default:
                console.warn('unmet event:', event.action)
        }

        setSelectedUsers(newSelected);
        setRemainingUsers(newRemaining);
        
        onUsersChange(value.map((item) => item.value));
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Users</span>
            </label>
                <Select
                    value={selectedUsers}
                    onChange={onSelectChange}
                    options={remainingUsers}
                    isClearable
                    isMulti
                    isSearchable
                    placeholder="Select users..."
                    closeMenuOnSelect={false}
                    classNames={{
                        control: (state) => (
                            'input-bordered'
                        ),
                        multiValue: (state) => (
                             'text-sm ring-1 ring-inset ring-gray-500/10'
                        )
                    }}
                    styles={{
                        control: (baseStyles, state) => ({
                            WebkitAlignItems: 'center',
                            WebkitBoxAlign: 'center',
                            msFlexAlign: 'center',
                            alignItems: 'center',
                            cursor: 'default',
                            display: '-webkit-box',
                            display: '-webkit-flex',
                            display: '-ms-flexbox',
                            display: 'flex',
                            WebkitBoxFlexWrap: 'wrap',
                            WebkitFlexWrap: 'wrap',
                            msFlexWrap: 'wrap',
                            flexWrap: 'wrap',
                            WebkitBoxPack: 'justify',
                            WebkitJustifyContent: 'space-between',
                            justifyContent: 'space-between',
                            minHeight: '38px',
                            position: 'relative',
                            WebkitTransition: 'all 100ms',
                            transition: 'all 100ms',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            boxSizing: 'border-box',
                            '--tw-bg-opacity': '1',
                            borderRadius: '0.5rem',
                            backgroundColor: 'hsl(var(--b1) / var(--tw-bg-opacity))',
                            borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
                            ':focus': {
                                outlineStyle: 'solid',
                                outlineWidth: '2px',
                                outlineOffset: '2px',
                                outlineColor: 'hsl(var(--bc) / 0.2)',
                            },
                            ':hover': {
                                borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))'
                            }
                        }),
                        menu: (baseStyles, state) => ({
                            ...baseStyles,
                            zIndex: 11,
                            '--tw-bg-opacity': '1',
                            backgroundColor: 'hsl(var(--b1) / var(--tw-bg-opacity))',
                        }),
                        valueContainer: (baseStyles, state) => ({
                            ...baseStyles,
                            paddingLeft: '0.5rem',
                            paddingRight: '0.75rem',
                            paddingTop: '0.05rem',
                            paddingBottom: '0.05rem'
                        }),
                        multiValue: (baseStyles, state) => ({
                            ...baseStyles,
                            borderRadius: '0.375rem'
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                            ...baseStyles,
                            fontSize: '0.875rem',
                        }),
                        multiValueRemove: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'grey',
                            ':hover': {
                                color: 'rgb(31, 41, 55)'
                            }
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: 'transparent',
                            color: 'hsl(var(--bc) / var(--tw-text-opacity))',
                            ':hover': {
                                cursor: 'pointer',
                                backgroundColor: 'hsl(var(--bc) / 0.1)',
                                '--tw-text-opacity': '1',
                                color: 'hsl(var(--bc) / var(--tw-text-opacity))',
                                outline: '2px solid transparent',
                                outlineOffset: '2px'
                            }
                        })
                    }}
                />

        </div>
    );
};

export default UserSelector;
