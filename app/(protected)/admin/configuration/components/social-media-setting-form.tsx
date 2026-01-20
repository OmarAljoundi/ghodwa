'use client';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Trash2,
  Twitter,
  Youtube,
} from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { SettingSchema } from '@/schema/setting-schema';

const socialIcons = {
  Youtube: <Youtube className="h-5 w-5" />,
  Facebook: <Facebook className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  X: <Twitter className="h-5 w-5" />,
  Email: <Mail className="h-5 w-5" />,
  Whatsapp: <MessageCircle className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
};

const channels = [
  'Youtube',
  'Facebook',
  'LinkedIn',
  'Instagram',
  'X',
  'Email',
  'Whatsapp',
  'Phone',
] as const;

export function SocialMediaSettingForm(_: { lang?: 'ar_' | 'en_' }) {
  const { control } = useFormContext<SettingSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMediaContact.items',
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media & Contact Options section</CardTitle>
        <CardDescription>
          This will appear in the Social Media & Contact Options for the website
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />

      <CardContent className="pt-2">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <h1>Social Media & Contact Channels</h1>
            <Button
              type="button"
              variant="outline"
              disabled={fields.length >= 8}
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  channel: 'Youtube',
                  url: '',
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Channel
            </Button>
          </div>
          <FormField
            control={control}
            name="socialMediaContact.items"
            render={() => (
              <FormItem className="w-full">
                <FormControl>
                  <div>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-x-4">
                        <FormField
                          control={control}
                          name={`socialMediaContact.items.${index}.channel`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select channel">
                                    {field.value && (
                                      <div className="flex items-center gap-x-2">
                                        {socialIcons[field.value]}
                                        <span>{field.value}</span>
                                      </div>
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {channels.map((channel) => (
                                    <SelectItem
                                      key={channel}
                                      value={channel}
                                      className="flex items-center gap-x-2"
                                    >
                                      <div className="flex items-center gap-x-2">
                                        {socialIcons[channel]}
                                        <span>{channel}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`socialMediaContact.items.${index}.url`}
                          render={({ field }) => (
                            <FormItem className=" w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={`Enter ${
                                    fields[index].channel || 'channel'
                                  } URL or contact`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="w-fit">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
