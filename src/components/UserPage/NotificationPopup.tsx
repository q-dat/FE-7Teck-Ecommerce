import React, { useEffect, useRef, useState } from 'react';
import { Button, Hero, Textarea } from 'react-daisyui';
import InputForm from './InputForm';

const NotificationPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('popupShown')) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupShown', 'true');
  };

  const [result, setResult] = React.useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult('Đang gửi...');

    const formData = new FormData(event.currentTarget);

    formData.append('access_key', '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult('Gửi thành công!');

        // Reset form using formRef
        formRef.current?.reset();
      } else {
        console.error('Error', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Yêu cầu thất bại!', error);
      setResult('Có lỗi xảy ra khi gửi biểu mẫu!');
    }
  };
  return (
    <div>
      {isVisible && (
        <div>
          <div
            id="popup-overlay"
            className="fixed left-0 top-0 z-50 h-full w-full cursor-pointer bg-black bg-opacity-50"
            onClick={closePopup}
          ></div>

          <div
            id="popup"
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-lg bg-white shadow-lg dark:bg-gray-700"
          >
            <div className="flex flex-col items-end justify-center rounded-lg border border-white dark:border-opacity-50">
              {/* IMAGE BANNER */}
              <Hero>
                <Hero.Content>
                  <div id="contact" className="flex w-full flex-col rounded-xl">
                    <div
                      className="flex flex-col items-end justify-center"
                      onClick={closePopup}
                    >
                      <p className="rounded-md bg-red-500 px-4 py-2 text-white">
                        X
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-[40px] font-bold uppercase text-primary dark:text-white">
                        Thông tin liên hệ
                      </p>
                      <p className="font-semibold text-primary dark:text-white">
                        Chúng Tôi Luôn Sẵn Sàng Lắng Nghe: Hãy Để Lại Lời Nhắn
                        Của Bạn!{' '}
                      </p>
                    </div>
                    {/* Form */}
                    <form
                      ref={formRef}
                      onSubmit={onSubmit}
                      className="my-5 flex items-center justify-center rounded-xl border border-primary bg-white p-5 dark:border-white dark:bg-gray-500"
                    >
                      <div className="flex w-1/2 items-center justify-center">
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-5 xl:flex-row">
                            <InputForm
                              name="email"
                              type="email"
                              placeholder="Email"
                              className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[500px]"
                              classNameLabel="bg-white dark:bg-gray-700"
                            />
                            <InputForm
                              name="name"
                              type="text"
                              className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[300px]"
                              placeholder="Tên của bạn"
                              classNameLabel="bg-white dark:bg-gray-700"
                            />
                          </div>
                          <Textarea
                            name="feedback"
                            className="border border-gray-300 bg-white text-black focus:border-primary focus:outline-none dark:bg-gray-700 dark:text-white xs:w-full sm:w-[350px] md:w-[650px] lg:w-full"
                            placeholder="Tin nhắn của bạn"
                          />
                          <div className="w-full">
                            <Button
                              className="w-full bg-primary text-sm text-white hover:border-primary hover:bg-secondary hover:text-white dark:hover:bg-gray-700"
                              type="submit"
                            >
                              Gửi
                            </Button>
                            <span>{result}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Hero.Content>
              </Hero>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
