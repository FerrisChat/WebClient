import React, { useState } from 'react';
import Modal from 'react-modal';

import Button, { ButtonStyle } from '../common/Button';
import newGuildIcon from '../../assets/new_guild.svg';

import type { GuildData } from '../../types';

export default function NewGuild() {
    let [ modalOpen, setModalOpen ] = useState(false);
    let [ modalContent, setModalContent ] = useState(<></>);

    return (
        <>
            <Modal
                className='new-guild-modal'
                isOpen={modalOpen}
                onAfterOpen={() => setModalContent(
                    <>
                        <h1>New Server</h1>
                        <div className='new-guild-modal-buttons'>
                            <Button style={ButtonStyle.primary} label='Join Server' onClick={() => {
                                setModalContent(
                                    <>
                                        <h1>Join a Server</h1>
                                        <div className='join-guild-input'>
                                            <label htmlFor='guild-invite'>Server Invite</label>
                                            <input
                                                name='guild-invite'
                                                id='guild-invite__box'
                                                type='text'
                                                placeholder='Invite Code'
                                            />
                                        </div>
                                        <div className='join-guild-button-container'>
                                            <Button style={ButtonStyle.success} label='Join Server' onClick={() => {
                                                const element = document.querySelector('#guild-invite__box')! as HTMLInputElement;
                                                const link: string = element.value as string;
                                                
                                                if (!/^((https?:\/\/)?(app\.)?ferris\.(chat|sh)\/invite\/?)?[a-zA-Z0-9]{3,18}\/?$/g.test(link)) {
                                                    element.style.border = '2px solid red';
                                                    return
                                                }
            
                                                element.disabled = true;
                                                const code = /[a-zA-Z0-9]{3,10}/.exec(link)!.at(-1);
                                                window.api!.rest!.request('POST', `/invites/${code}`, { json: {} }).then(() => {
                                                    window.location.pathname = '/home';  // TODO: redirect to guild /channels/:id
                                                })
                                                    .catch(() => {
                                                        element.style.border = '2px solid red';
                                                        element.disabled = false;
                                                    });
                                            }} />
                                        </div>
                                    </>
                                )
                            }} />
                            <Button style={ButtonStyle.success} label='Create Server' onClick={() => {
                                setModalContent(
                                    <>
                                        <h1>Create a Server</h1>
                                        <div className='create-guild-input'>
                                            <label htmlFor='guild-name'>Server Name</label>
                                            <input
                                                name='guild-name'
                                                id='guild-name__box'
                                                type='text'
                                                placeholder='My Cool Server'
                                                minLength={1}
                                                maxLength={32}
                                            />
                                        </div>
                                        <div className='create-guild-button-container'>
                                            <Button style={ButtonStyle.success} label='Create Server' onClick={() => {
                                                const element = document.querySelector('#guild-name__box')! as HTMLInputElement;
                                                const name: string = element.value as string;
                                                const json = { name };

                                                element.disabled = true;
                                                window.api!.rest!.request('POST', `/guilds`, { json }).then(({ id_string }: GuildData) => {
                                                    window.location.pathname = `/channels/${id_string}`
                                                })
                                                    .catch(() => {
                                                        element.style.border = '2px solid red';
                                                        element.disabled = false;
                                                    });
                                            }} />
                                        </div>
                                    </>
                                )
                            }} />
                        </div>
                    </>
                )}
                onRequestClose={() => setModalOpen(false)}
            >
                {modalContent}
            </Modal>
            <div className='guild-select-guild' onClick={() => setModalOpen(true)}>
                <img src={newGuildIcon} alt='new guild' />
            </div>
        </>
    )
}