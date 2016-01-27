require 'csv'

module Download

  def to_csv(datas)
    ## mac 中 office 中文乱码
    CSV.generate do |csv|
      csv << datas.first.class.column_names

      datas.each do |data|
        csv << data.attributes.values
      end
    end
  end

end