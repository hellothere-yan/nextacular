import { CheckIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();
  return (
    <div id="pricing" className="scroll-target w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
        <div className="flex flex-col items-center">
          <h6 className="text-xl my-2 font-bold text-center text-blue-600 uppercase">
            {t('common.label.price1')}
          </h6>
          <h4 className="text-4xl my-2 font-bold text-center">
            <span className="block">{t('common.label.price2')}</span>
          </h4>
          <h1 className="text-1xl my-2 text-center text-gray-600">
            {t('common.label.price3')}
          </h1>
        </div>

        <div class="grid gap-4 lg:gap-6 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-full">
          <div class="border bg-card text-card-foreground shadow p-6 lg:p-8 rounded-xl">
            <div class="p-0 flex flex-col gap-8">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-3 relative">
                  <h3 class="text-lg font-semibold ">尝鲜版</h3>
                  <p class="text-sm text-muted-foreground">
                    适合尝鲜用户的套餐
                  </p>
                </div>
                <div class="flex items-end gap-2">
                  <span class="text-4xl font-semibold">¥9.9</span>
                </div>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full">
                  购买
                </button>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      20张图片生成
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      支持高清图片下载
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border bg-card text-card-foreground shadow p-6 lg:p-8 rounded-xl">
            <div class="p-0 flex flex-col gap-8">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-3 relative">
                  <h3 class="text-lg font-semibold ">标准版</h3>
                  <p class="text-sm text-muted-foreground">
                    性价比最高的标准套餐
                  </p>
                </div>
                <div class="flex items-end gap-0.5">
                  <span class="text-4xl font-semibold">¥19.9</span>
                </div>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full">
                  购买
                </button>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      50张图片生成
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      支持高清图片下载
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-card text-card-foreground shadow p-6 lg:p-8 rounded-xl border-2 border-primary">
            <div class="p-0 flex flex-col gap-8">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-3 relative">
                  <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 w-fit absolute top-1 right-0">
                    最受欢迎
                  </div>
                  <h3 class="text-lg font-semibold text-primary">高级版</h3>
                  <p class="text-sm text-muted-foreground">
                    高级用户的进阶套餐
                  </p>
                </div>
                <div class="flex items-end gap-0.5">
                  <span class="text-4xl font-semibold">¥49.9</span>
                </div>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
                  购买
                </button>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      150张图片生成
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      支持高清图片下载
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border bg-card text-card-foreground shadow p-6 lg:p-8 rounded-xl">
            <div class="p-0 flex flex-col gap-8">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-3 relative">
                  <h3 class="text-lg font-semibold ">专业版</h3>
                  <p class="text-sm text-muted-foreground">
                    专业需求的全功能套餐
                  </p>
                </div>
                <div class="flex items-end gap-0.5">
                  <span class="text-4xl font-semibold">¥99</span>
                </div>
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full">
                  购买
                </button>
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      300张图片生成
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span class="text-sm text-muted-foreground flex-1">
                      支持高清图片下载
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
