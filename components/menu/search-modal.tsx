"use client";
import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle
} from "@/components/ui/credenza";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface IBookVist {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

const SearchModal = ({ isOpen, setIsOpen }: IBookVist) => {
    const [value, setValue] = useState<string>('')
    const router = useRouter()
    const ref = useRef<HTMLButtonElement>(null)
    const { t } = useTranslation('common')

    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            ref.current?.click();
            (e.target as HTMLInputElement).blur();
        }
    }

    const onSearch = () => {
        router.push(`/search?searchString=${value}`)
        setIsOpen(false)
    }

    return (
        <>
            <Credenza open={isOpen} onOpenChange={setIsOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>{t('search')}</CredenzaTitle>
                    </CredenzaHeader>
                    <CredenzaBody>
                        <div className="flex gap-4 mb-4">
                            <Input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={onPressEnter}
                            />
                            <Button
                                ref={ref}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSearch()
                                }}
                                className="bg-gray-500"
                            >
                                {t('search')}
                            </Button>
                        </div>
                    </CredenzaBody>
                </CredenzaContent>
            </Credenza>
        </>
    )
}

export default SearchModal