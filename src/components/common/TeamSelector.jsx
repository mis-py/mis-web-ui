import React from 'react';
import Select from "react-select";
import {
    useGetTeamsQuery
} from "redux/index";

const TeamSelector = ({userTeam, onTeamChange}) => {
    const { data: teamsList = [] } = useGetTeamsQuery();

    const teamOptions = teamsList?.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    const onSelectChange = (value, event) => {
        onTeamChange(value);
    }
    
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Team</span>
            </label>
            <Select 
                value={userTeam?.name} 
                onChange={onSelectChange}
                options={teamOptions}
                isClearable
                isSearchable
                placeholder="Select team..."
                classNames={{
                    control: (state) => (
                        'input-bordered'
                    ),
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
                    singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: 'hsl(var(--bc) / var(--tw-text-opacity, 1))'
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: 'transparent',
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

export default TeamSelector;
