'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { UploadFile } from '@/components/UploadFile'
import X from '@/icons/X'
import { useUser } from '@/states/useUser'
import type { UpdateProfileResponse } from '@/types/api'
import type {
	UpdateProfileErrors,
	UpdateProfileFormElements
} from '@/types/forms'
import { doFetch } from '@/utils/fetch'
import { getErrorEntries, getProcessedErrors } from '@/utils/form'
import { snackbar } from '@/utils/dom'
import { useCallback, useState, Activity } from 'react'

export default function ApprenticeProfilePage() {
	const { user, getUser, setUser } = useUser((state) => state)
	const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
	const [confirmedImage, setConfirmedImage] = useState(false)
	const [updatingProfile, setUpdatingProfile] = useState(false)
	const [errors, setErrors] = useState<Partial<UpdateProfileErrors>>({})
	const imageUrlFallback =
		'https://res.cloudinary.com/dp6ucd28f/image/upload/v1763591326/votaciones-v2/users/base_user.webp'

	const handleChangeProfileImage = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (!file) return

			const url = URL.createObjectURL(file)
			setProfileImageUrl(url)

			setConfirmedImage(false)
		},
		[]
	)

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const key = event.target.name as keyof UpdateProfileErrors

			setErrors((prev) => ({ ...prev, [key]: null }))
		},
		[]
	)

	const handleUpdateProfile = useCallback(
		async (event: React.SyntheticEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (updatingProfile)
				return snackbar({ message: 'Espera un momento', variant: 'info' })

			if (profileImageUrl && !confirmedImage) {
				return snackbar({
					message: 'Debes confirmar la imagen',
					variant: 'warning'
				})
			}

			const target = event.currentTarget as HTMLFormElement

			const { name, lastname, phone, email, image } =
				target.elements as UpdateProfileFormElements

			const locallyErrors: Partial<UpdateProfileErrors> = {}

			for (const i of [name, lastname, phone, email]) {
				const key = i.name as keyof UpdateProfileErrors
				if (i.value.trim() === '') locallyErrors[key] = 'Campo requerido'
			}

			setErrors((prev) => ({ ...prev, ...locallyErrors }))

			const locallyErrorsEntries = getErrorEntries(locallyErrors)
			const errorsEntries = getErrorEntries(errors)

			if (locallyErrorsEntries.length > 0 || errorsEntries.length > 0) return

			setUpdatingProfile(true)

			const formData = new FormData(target)

			if (!confirmedImage) formData.delete('image')

			const data = await doFetch<UpdateProfileResponse>({
				url: '/user/profile',
				method: 'PUT',
				body: formData
			})

			setUpdatingProfile(false)

			if (!data.ok) {
				console.log({ data })

				if ('errors' in data) {
					const errors = getProcessedErrors(data.errors)
					setErrors(errors)
				}

				if ('message' in data)
					snackbar({ message: data.message, variant: 'error' })

				return
			}

			const user = await getUser()
      setUser(user)
			setProfileImageUrl(null)
			snackbar({ message: data.message, variant: 'success' })
      image.value = ''
		},
		[updatingProfile, errors, profileImageUrl, confirmedImage, getUser, setUser]
	)

	const apprenticeImageUrl = user?.imageUrl
	const showUploadFile = !profileImageUrl || (profileImageUrl && confirmedImage)

	return (
		<>
			<link rel="stylesheet" href="/assets/css/form-ntw.css" />
			<main className="w-11/12 lg:w-9/12 mx-auto mt-7">
				<form
					className="size-full flex flex-col lg:flex-row lg:gap-6 justify-center shadow lg:shadow-none mb-6"
					onSubmit={handleUpdateProfile}
				>
					<div className="w-full lg:w-4/12 h-full border border-gray-400/60 lg:shadow rounded p-7 lg:border-b rounded-b-none lg:rounded-b">
						<div className="aspect-square w-11/12 h-auto mx-auto lg:w-full rounded">
							<a
								className="relative"
								href={profileImageUrl || apprenticeImageUrl || imageUrlFallback}
								target="_blank"
								rel="noopener noreferrer"
							>
								{!confirmedImage && profileImageUrl && (
									<div
										className="absolute top-1 right-1 bg-red-600/60 backdrop-blur z-50 p-1 rounded [&_svg]:size-5"
										onClick={(event) => {
											event.preventDefault()
											event.stopPropagation()
											setProfileImageUrl(null)
										}}
									>
										<X />
									</div>
								)}
								<img
									className="size-full object-cover rounded border-2 border-primary/70 dark:border-dark-primary mx-auto"
									src={profileImageUrl || apprenticeImageUrl || imageUrlFallback}
									alt={`Foto de el usuario ${user?.name}`}
								/>
							</a>
						</div>
						<div className="w-11/12 mx-auto lg:w-full mt-5 h-10">
							<Activity mode={showUploadFile ? 'visible' : 'hidden'}>
								<UploadFile
									id="profile-image"
									name="image"
									text="Cambiar foto"
									inputProps={{ accept: 'image/*' }}
									onChange={handleChangeProfileImage}
								/>
							</Activity>

							{!confirmedImage && profileImageUrl && (
								<div className="flex flex-row gap-3 text-sm [&_button]:mb-0 size-full">
									<Button
										className="bg-transparent border border-gray-500/70 hover:bg-gray-300/70 "
										showLoader={false}
										onClick={() => {
											setProfileImageUrl(null)
											setConfirmedImage(false)
										}}
									>
										Cancelar
									</Button>
									<Button
										showLoader={false}
										onClick={() => {
											setConfirmedImage(true)
										}}
									>
										Confirmar
									</Button>
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-col lg:grid grid-cols-2  space-y-10 gap-x-7 w-full lg:w-8/12 border border-gray-400/60 border-t-0 lg:border-t rounded-t-none lg:rounded-t lg:shadow rounded px-9 py-10">
						<Input
							label="Nombre"
							name="name"
							id="name"
							type="text"
							error={errors.name}
							defaultValue={user?.name}
							onChange={handleInputChange}
						/>
						<Input
							label="Apellido"
							name="lastname"
							id="lastname"
							type="text"
							error={errors.lastname}
							defaultValue={user?.lastname}
							onChange={handleInputChange}
						/>
						<Select
							error={null}
							items={user ? [user.typeDocumentUser] : null}
							label="Tipo de documento"
							id="typeDocumentCode"
							name="typeDocumentCode"
							required
							selectedItem={user?.typeDocumentUser.code}
							disabled
						/>
						<Input
							label="Documento"
							name="document"
							id="document"
							type="number"
							error={null}
							defaultValue={user?.document}
							disabled
						/>
						<Input
							label="Telefono"
							name="phone"
							id="phone"
							type="number"
							error={errors.phone}
							defaultValue={user?.phone}
							onChange={handleInputChange}
						/>
						<Input
							label="Correo"
							name="email"
							id="email"
							type="email"
							error={errors.email}
							defaultValue={user?.email}
							onChange={handleInputChange}
						/>
						<Select
							disabled
							label="Rol"
							name="role"
							id="role"
							error={null}
							items={user ? [user.roleUser] : null}
							selectedItem={user?.roleUser.code}
						/>
						<Button
							loading={updatingProfile}
							className="col-span-2 mb-0 h-10"
							showLoader={true}
							onClick={() => {}}
							type="submit"
						>
							Actualizar
						</Button>
					</div>
				</form>
			</main>
		</>
	)
}
