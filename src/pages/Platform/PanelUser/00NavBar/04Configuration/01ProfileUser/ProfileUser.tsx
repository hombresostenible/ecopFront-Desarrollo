/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch } from 'react-redux';
import { getProfileUser, putPutProfileUser, logoChangeUser, deleteLogoUser } from '../../../../../../redux/User/userSlice/actions';
import type { AppDispatch } from '../../../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IUser } from '../../../../../../types/User/user.types';
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

interface UserCardProps {
    user: IUser;
}

function ProfileUser({ user }: UserCardProps) {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [userLogo, setUserLogo] = useState<string | null>(null);
    const [editedUser, setEditedUser] = useState<IUser>({ ...user });
    const [editedtypeDocumentId, setEditedtypeDocumentId] = useState(user.typeDocumentId);
    const [editedDepartment, setEditedDepartment] = useState(user.department);
    const [editedEconomicSector, setEditedEconomicSector] = useState(user.economicSector);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        if (user.logo) {
            setUserLogo(user.logo);
        }
    }, [user.logo]);

    const handleEditField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string,
        dataType: 'text' | 'number' = 'text'
    ) => {
        const newValue = e.target.value;
        if (dataType === 'number') {
            const numericValue = parseFloat(newValue);
            if (!isNaN(numericValue)) {
                setEditedUser((prevEditedUser) => ({
                    ...prevEditedUser,
                    [field]: numericValue,
                }));
            }
        } else {
            setEditedUser((prevEditedUser) => ({
                ...prevEditedUser,
                [field]: newValue,
            }));
        }
    };

    const handleSaveChanges = async (editedUser: IUser) => {
        try {
            editedUser.typeDocumentId = editedtypeDocumentId;
            editedUser.department = editedDepartment;
            editedUser.economicSector = editedEconomicSector;
            dispatch(putPutProfileUser(editedUser, token));
            dispatch(getProfileUser(token));
            setIsEditing(false);
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    const cancelEditing = (id: string) => {
        setIsEditing(false);
        setEditedUser({ ...editedUser, [id]: { ...user } });
    };

    const handleEditClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuOptionClick = (option: string) => {
        if (option === 'CargarImagen') {
            setSelectedImage(null);
            setMenuVisible(false);
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e: any) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    setSelectedImage(file);
                    handleUploadImage(file);
                }
            };
            fileInput.click();
        } else if (option === 'EliminarImagen') {
            try {
                dispatch(deleteLogoUser(token));
                window.location.reload();
            } catch (error) {
                throw new Error('Error al eliminar la imagen');
            }
            setMenuVisible(false);
        }
    };

    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ menuRef ]);

    const handleUploadImage = async (image: File) => {
        try {   
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "images");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dqvdqhf4x/image/upload", formData);
            const imageUrl = response.data.secure_url;
            const userData: Partial<IUser> = {
                logo: imageUrl,
            };
            window.location.reload();
            dispatch(logoChangeUser(userData, token));
        } catch (error) {
            throw new Error('Error al cargar la imagen');
        }
    };

    return (
        <div className={`${styles.container} d-flex flex-column align-items-center justify-content-between overflow-hidden overflow-y-auto`}>
            <div className={`${styles.container__Component} overflow-hidden overflow-y-auto`}>
                <h1 className={`${styles.title} mb-4`}>Tu información de perfil</h1>
                <div className={`${styles.container__Card} m-auto d-flex flex-column align-items-center justify-content-center`}>
                    <div className={`${styles.container__Image_Icon} mb-4 position-relative r d-flex align-items-center justify-content-center`}>
                        <div>
                            {userLogo && (
                                <img className={`${styles.logo} `} src={userLogo} alt="Logo del usuario" />
                            )}
                            {!userLogo && (
                                <div className={styles.container__Text_Logo}>
                                    <p className="text-center">No tienes un logo para mostrar</p>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.container__Image} `}>
                            <div className={`${styles.container__Icon} d-flex align-items-center justify-content-center position-absolute`} onClick={handleEditClick} >
                                <BsPencil className={`${styles.iconLogo} `} />
                            </div>
                            {menuVisible && (
                                <div ref={menuRef} className={`${styles.menu} d-flex align-items-center justify-content-center position-absolute`}>
                                    {selectedImage ? (
                                        <div>
                                            <button onClick={() => handleUploadImage(selectedImage)}>Cargar imagen</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className={styles.text__Menu} onClick={() => handleMenuOptionClick('CargarImagen')}>Cargar imagen</div>
                                            <div className={styles.text__Menu} onClick={() => handleMenuOptionClick('EliminarImagen')}>Eliminar imagen</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Nombres</h6>
                        <div className={styles.containerInput}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.input} mb-2 p-2 border`}
                                    value={editedUser.name}
                                    onChange={(e) => handleEditField(e, 'name', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Apellidos</h6>
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.input} mb-2 p-2 border`}
                                    value={editedUser.lastName}
                                    onChange={(e) => handleEditField(e, 'lastName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.lastName}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Tipo de identificación</h6>
                        <div>
                            {isEditing ? (
                                <select
                                    value={editedtypeDocumentId || ''}
                                    className={`${styles.input} mb-2 p-2 border`}
                                    onChange={(e) => setEditedtypeDocumentId(e.target.value as 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte')}
                                >
                                    <option value='NIT'>Cédula de Ciudadanía</option>
                                    <option value='Cedula de Ciudadania'>Cédula de Ciudadanía</option>
                                    <option value='Cedula de Extranjeria'>Cédula de Extranjería</option>
                                    <option value='Pasaporte'>Pasaporte</option>
                                </select>
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.typeDocumentId}</p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                        <div className="mb-2 w-100">
                            <h6 className={`${styles.label} mb-1`}>Identificación</h6>
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.documentId || ''}
                                        className={`${styles.input} mb-2 p-2 border`}
                                        onChange={(e) => handleEditField(e, 'documentId', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user.documentId}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-2 w-100">
                            <h6 className={`${styles.label} mb-1`}>Dígito de verificación</h6>
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.verificationDigit || ''}
                                        onChange={(e) => handleEditField(e, 'verificationDigit', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user.verificationDigit ? user.verificationDigit : 'No asignado aún'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Nombre comercial de tu empresa</h6>
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.input} mb-2 p-2 border`}
                                    value={editedUser.commercialName || ''}
                                    onChange={(e) => handleEditField(e, 'commercialName', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.commercialName ? user.commercialName : 'No asignado aún'}</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Email</h6>
                        <div>
                            <p className={`${styles.input} p-2 text-start border`}>{user.email || ''}</p>
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Rol del usuario</h6>
                        <div>
                            <p className={`${styles.input} p-2 text-start border`}>{user.typeRole || ''}</p>
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Celular</h6>
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.input} mb-2 p-2 border`}
                                    value={editedUser.phone || ''}
                                    onChange={(e) => handleEditField(e, 'phone', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.phone}</p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                        <div className="mb-2 w-100">
                            <h6 className={`${styles.label} mb-1`}>Departamento</h6>
                            <div>
                                {isEditing ? (
                                    <select
                                        value={editedDepartment || ''}
                                        className={`${styles.input} mb-2 p-2 border`}
                                        onChange={(e) => setEditedDepartment(e.target.value as 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada')}
                                    >
                                        <option value='Bogota D.C.'>Bogotá D.C.</option>
                                        <option value='Amazonas'>Amazonas</option>
                                        <option value='Antioquia'>Antioquia</option>
                                        <option value='Arauca'>Arauca</option>
                                        <option value='Atlantico'>Atlántico</option>
                                        <option value='Bolivar'>Bolívar</option>
                                        <option value='Boyaca'>Boyacá</option>
                                        <option value='Caldas'>Caldas</option>
                                        <option value='Caqueta'>Caquetá</option>
                                        <option value='Casanare'>Casanare</option>
                                        <option value='Cauca'>Cauca</option>
                                        <option value='Cesar'>Cesar</option>
                                        <option value='Choco'>Chocó</option>
                                        <option value='Cordoba'>Córdoba</option>
                                        <option value='Cundinamarca'>Cundinamarca</option>
                                        <option value='Guainia'>Guainía</option>
                                        <option value='Guaviare'>Guaviare</option>
                                        <option value='Huila'>Huila</option>
                                        <option value='La Guajira'>La Guajira</option>
                                        <option value='Magdalena'>Magdalena</option>
                                        <option value='Meta'>Meta</option>
                                        <option value='Nariño'>Nariño</option>
                                        <option value='Norte de Santander'>Norte de Santander</option>
                                        <option value='Putumayo'>Putumayo</option>
                                        <option value='Quindio'>Quindío</option>
                                        <option value='Risaralda'>Risaralda</option>
                                        <option value='San Andres y Providencia'>San Andrés y Providencia</option>
                                        <option value='Santander'>Santander</option>
                                        <option value='Sucre'>Sucre</option>
                                        <option value='Tolima'>Tolima</option>
                                        <option value='Valle del Cauca'>Valle del Cauca</option>
                                        <option value='Vaupes'>Vaupés</option>
                                        <option value='Vichada'>Vichada</option>
                                    </select>
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user.department}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-2 w-100">
                            <h6 className={`${styles.label} mb-1`}>Ciudad</h6>
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className={`${styles.input} mb-2 p-2 border`}
                                        value={editedUser.city || ''}
                                        onChange={(e) => handleEditField(e, 'city', 'text')}
                                    />
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user.city}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        <h6 className={`${styles.label} mb-1`}>Dirección</h6>
                        <div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className={`${styles.input} mb-2 p-2 border`}
                                    value={editedUser.address || ''}
                                    onChange={(e) => handleEditField(e, 'address', 'text')}
                                />
                            ) : (
                                <p className={`${styles.input} p-2 text-start border`}>{user.address}</p>
                            )}
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 gap-2">
                        <div className="mb-2 w-100">
                            <h6 className={`${styles.label} mb-1`}>Sector económico</h6>
                            <div>
                                {isEditing ? (
                                    <select
                                        value={editedEconomicSector || ''}
                                        className={`${styles.input} mb-2 p-2 border`}
                                        onChange={(e) => setEditedEconomicSector(e.target.value as 'Agricultura' | 'Manufactura' | 'Comercio' | 'Servicios' | 'Construcción' | 'Turismo' | 'Otro')}
                                    >
                                        <option value='Agricultura'>Agricultura</option>
                                        <option value='Manufactura'>Manufactura</option>
                                        <option value='Comercio'>Comercio</option>
                                        <option value='Servicios'>Servicios</option>
                                        <option value='Construcción'>Construcción</option>
                                        <option value='Comercio'>Comercio</option>
                                        <option value='Turismo'>Turismo</option>
                                        <option value='Otro'>Otro</option>
                                    </select>
                                ) : (
                                    <p className={`${styles.input} p-2 text-start border`}>{user.economicSector}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 w-100">
                        {isEditing ? (
                            <div className="d-flex align-items-center justify-content-center">
                                <button className={`${styles.button__Save} mx-2 pt-1 pb-1 px-2 border-0`} onClick={() => handleSaveChanges(editedUser)}>Guardar</button>
                                <button className={`${styles.button__Cancel} mx-2 pt-1 pb-1 px-2 border-0`} onClick={() => cancelEditing(user.id)}>Cancelar</button>
                            </div>
                        ) : (
                            <div
                                className={`${styles.divButtonEdit} d-flex align-items-center justify-content-center`}
                                onClick={() => {
                                    setEditedUser({ ...user });
                                    setIsEditing(true);
                                }}
                            >
                                <h6 className='m-0'>Edita tu información</h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;